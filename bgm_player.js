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

    // オーディオオブジェクト作成
    const audio = new Audio('data/portfolio.wav');
    audio.loop = true; // ループ再生
    audio.volume = 0.5;

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
                    <span class="scrolling-text">Now Playing: portfolio.wav ... </span>
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
            <div class="player-time">00:00</div>
        </div>
    `;

    document.body.appendChild(player);

    const playBtn = player.querySelector('.play');
    const stopBtn = player.querySelector('.stop');
    const seekBar = player.querySelector('.seek-bar');
    const timeDisplay = player.querySelector('.player-time');
    const bars = player.querySelectorAll('.bar');

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
        // durationが取得できたらmaxを設定することも可能だが、
        // ここでは0-100%で扱っているので変更不要
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
            // サーバー環境によってはシーク反映に時間がかかる場合がある
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
