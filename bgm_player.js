// BGMプレーヤー風の装飾コンポーネントを作成して表示する
// 注: 実際の音声再生機能はありません（装飾のみ）

// BGMプレーヤー機能 (再生機能付き)
// data/portfolio.wav を再生

document.addEventListener('DOMContentLoaded', () => {
    // ユーザー操作が必要なため、自動再生はせずクリック待ち
    createBGMPlayer();
});

function createBGMPlayer() {
    const player = document.createElement('div');
    player.className = 'retro-bgm-player';

    // プレイリスト設定 (config.jsから読み込み、なければデフォルト)
    const playlist = (typeof BGM_PLAYLIST !== 'undefined' && BGM_PLAYLIST.length > 0)
        ? BGM_PLAYLIST
        : ['portfolio.wav']; // フォールバック

    let currentTrackIndex = 0;
    const audio = new Audio();
    audio.volume = 0.075; // さらに-6dB (0.15 -> 0.075)

    // トラックをロードする関数
    function loadTrack(index) {
        if (index < 0) index = playlist.length - 1;
        if (index >= playlist.length) index = 0;

        currentTrackIndex = index;
        const filename = playlist[currentTrackIndex];
        const src = `data/music/${filename}`;

        // ファイル名から表示用タイトルを抽出 ({順番}_{タイトル}.wav -> {タイトル}.wav)
        // 最初のアンダースコア以降をすべて取得する
        let title = filename;
        try {
            const firstUnderscore = filename.indexOf('_');
            if (firstUnderscore !== -1) {
                title = filename.substring(firstUnderscore + 1);
            }
        } catch (e) {
            console.warn("Title parsing failed", e);
        }

        audio.src = src;
        audio.load();

        // UI更新
        const scrollingText = player.querySelector('.scrolling-text');
        if (scrollingText) {
            scrollingText.textContent = `Now Playing: ${title} ... `;
        }
    }

    // 初期トラックロード
    loadTrack(0);

    // ドラッグ用変数
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    player.innerHTML = `
        <div class="player-title-bar">
            <span class="player-icon">♪</span>
            <span class="player-title">Retro Player</span>
            <div class="player-controls-min">
                <button class="player-btn-min">_</button>
                <button class="player-btn-close">×</button>
            </div>
        </div>
        <div class="player-main">
            <div class="player-screen">
                <div class="player-info">
                    <span class="scrolling-text">Now Playing: ...</span>
                </div>
                <div class="player-visualizer">
                    <div class="bar" style="height: 60%"></div>
                    <div class="bar" style="height: 80%"></div>
                    <div class="bar" style="height: 40%"></div>
                    <div class="bar" style="height: 90%"></div>
                    <div class="bar" style="height: 50%"></div>
                    <div class="bar" style="height: 70%"></div>
                    <div class="bar" style="height: 30%"></div>
                    <div class="bar" style="height: 60%"></div>
                </div>
            </div>
            <div class="player-controls">
                <button class="ctrl-btn prev">⏮</button>
                <button class="ctrl-btn play">▶</button>
                <button class="ctrl-btn next">⏭</button>
                <button class="ctrl-btn stop">■</button>
                <!-- シークバーに変更 -->
                <input type="range" class="seek-bar" min="0" max="100" value="0">
            </div>
            <div class="player-time">00:00 / 00:00</div>
        </div>
    `;

    document.body.appendChild(player);

    // UI要素の再取得 (innerHTML書き換え後)
    const playBtn = player.querySelector('.play');
    const stopBtn = player.querySelector('.stop');
    const prevBtn = player.querySelector('.prev');
    const nextBtn = player.querySelector('.next');
    const seekBar = player.querySelector('.seek-bar');
    const timeDisplay = player.querySelector('.player-time');
    const bars = player.querySelectorAll('.bar');

    // 再取得した要素でタイトル初期表示を更新
    loadTrack(currentTrackIndex);

    // 閉じるボタン
    player.querySelector('.player-btn-close').addEventListener('click', () => {
        player.style.display = 'none';
        audio.pause(); // 閉じたら止める
    });

    // 再生・一時停止
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playBtn.textContent = '⏸';
                toggleVisualizer(true);
            }).catch(e => console.log('再生エラー:', e));
        } else {
            audio.pause();
            playBtn.textContent = '▶';
            toggleVisualizer(false);
        }
    });

    // 停止
    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        playBtn.textContent = '▶';
        toggleVisualizer(false);
        updateTimeDisplay();
        seekBar.value = 0;
    });

    // 前へ
    prevBtn.addEventListener('click', () => {
        const wasPlaying = !audio.paused;
        loadTrack(currentTrackIndex - 1);
        if (wasPlaying) {
            audio.play().catch(e => console.log(e));
        } else {
            // 停止中ならアイコンなどは停止状態のまま
            playBtn.textContent = '▶';
            toggleVisualizer(false);
        }
    });

    // 次へ
    nextBtn.addEventListener('click', () => {
        const wasPlaying = !audio.paused;
        loadTrack(currentTrackIndex + 1);
        if (wasPlaying) {
            audio.play().catch(e => console.log(e));
        } else {
            playBtn.textContent = '▶';
            toggleVisualizer(false);
        }
    });

    // 曲終了時の処理 (次の曲へ)
    audio.addEventListener('ended', () => {
        loadTrack(currentTrackIndex + 1);
        audio.play().catch(e => console.log('Continuous play error:', e));
    });

    // ビジュアライザー制御
    function toggleVisualizer(isRunning) {
        bars.forEach(bar => {
            bar.style.animationPlayState = isRunning ? 'running' : 'paused';
        });
    }
    toggleVisualizer(false); // 初期は停止

    // タイムアップデート
    audio.addEventListener('timeupdate', () => {
        // シーク中はスライダーを更新しない
        if (!isSeeking) {
            const val = (audio.currentTime / audio.duration) * 100;
            seekBar.value = isNaN(val) ? 0 : val;
        }
        updateTimeDisplay();
    });

    // メタデータ読み込み完了
    audio.addEventListener('loadedmetadata', () => {
        updateTimeDisplay();
    });

    // シークバー操作
    let isSeeking = false;

    // 操作開始
    seekBar.addEventListener('mousedown', () => { isSeeking = true; });
    seekBar.addEventListener('touchstart', () => { isSeeking = true; });

    // 操作中（リアルタイムで時間を表示更新）
    seekBar.addEventListener('input', () => {
        isSeeking = true; // 念のため
        const time = (seekBar.value / 100) * audio.duration;
        updateTimeDisplay(time);
    });

    // 操作完了（シーク実行）
    const onSeekEnd = () => {
        if (isSeeking) {
            const time = (seekBar.value / 100) * audio.duration;
            if (isFinite(time)) {
                audio.currentTime = time;
                console.log(`Seek to: ${time}s`);
            }
            // 直後のtimeupdateによる戻り防止のため、遅延時間を延長
            setTimeout(() => {
                isSeeking = false;
            }, 800);
        }
    };

    seekBar.addEventListener('change', onSeekEnd);
    seekBar.addEventListener('mouseup', onSeekEnd);
    seekBar.addEventListener('touchend', onSeekEnd);

    function updateTimeDisplay(overrideTime) {
        let current = overrideTime !== undefined ? overrideTime : audio.currentTime;
        let total = audio.duration || 0;

        const format = (t) => {
            const m = Math.floor(t / 60);
            const s = Math.floor(t % 60);
            return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        timeDisplay.textContent = `${format(current)} / ${format(total)}`;
    }

    // ドラッグ機能
    const titleBar = player.querySelector('.player-title-bar');
    titleBar.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === titleBar || titleBar.contains(e.target)) {
            isDragging = true;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, player);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
}
