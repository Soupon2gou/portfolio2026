// サイトのドメイン名を動的に取得
const SITE_DOMAIN = window.location.hostname;

// アセット（画像・動画）のドメイン設定
const ASSETS_DOMAIN = "";

// 画像変換機能の使用フラグ
const USE_TRANSFORM = false;

// サムネイル画像の幅設定（ピクセル）
const THUMB_WIDTH = 600;

// フルサイズ画像の幅設定（ピクセル）
const FULL_WIDTH = 1200;

// BGMプレイリスト
// data/music/ フォルダ内のファイルを指定
// ファイル名の形式: {順番}_{タイトル}.wav
const BGM_PLAYLIST = [
  "1_SFP2.wav",
  // "2_NextSong.wav", 
];


// プロフィール設定
const PROFILE_CONFIG = {
  name: "Soupon2gou",
  // アイコン画像のパス（data/フォルダ推奨）
  iconPath: "data/profile_icon.jpg",
  // 自己紹介文（改行は \n または <br> で記述）
  description: "動画制作・DTM・ゲーム&ツール開発 \n が好きです～ \\(｀・ω・´)/ ",
  // ソーシャルリンク（必要に応じて追加）
  links: [
    { name: "X(Twitter)", url: "https://twitter.com/soupon2gou", icon: "🐦" },
    { name: "ニコニコ", url: "https://www.nicovideo.jp/user/118672563/video?ref=pc_userpage_menu", icon: "📺" },
    { name: "YouTube", url: "https://www.youtube.com/@soupon2gou", icon: "▶️" },
    { name: "日常", url: "https://www.youtube.com/@soupon2gou_nichijou", icon: "☀️" },
    { name: "bilibili", url: "https://space.bilibili.com/1159628614", icon: "哔" },
    { isBreak: true }, // 改行
    { name: "GitHub", url: "https://github.com/soupon2gou", icon: "💻" },
    { name: "note", url: "https://note.com/soupon2gou2", icon: "📝" },
  ]
};

const CATEGORIES = {
  // カテゴリID: { 表示名, 説明, 色設定 }
  video: {
    name: "動画編集・音MAD",
    description: "音楽と映像の同期、エフェクト処理、動画編集作品",
    color: "#e91e63",  // ピンク系
    icon: "🎬"
  },
  game: {
    name: "ゲーム開発",
    description: "Unity、2D/3Dゲーム、インタラクティブ作品",
    color: "#2196f3",  // ブルー系
    icon: "🎮"
  },
  tools: {
    name: "GitHubツール",
    description: "オープンソースライブラリ、自動化ツール、開発支援",
    color: "#4caf50",  // グリーン系
    icon: "🛠️"
  },
  research: {
    name: "研究活動",
    description: "コンピュータビジョン、機械学習、学術研究",
    color: "#ff9800",  // オレンジ系
    icon: "🔬"
  }
};

// ======= 作品テンプレート =======
// 
// 【新しい作品を追加する際のテンプレート】
// 以下をコピーして、GALLERY_ITEMS の該当カテゴリに追加してください

/*
// === 作品追加テンプレート ===
{
  // 必須項目
  path: "data/your-file.jpg",           // ファイルパス（data/フォルダ内推奨）
  caption: "作品のタイトル",             // 作品名・説明
  alt: "代替テキスト",                  // アクセシビリティ用
  
  // オプション項目
  type: "image",                        // "image", "video", "gif" のいずれか
  link: "https://example.com",          // 外部リンク（なければ削除）
  // 動画の場合、サムネイルは自動的に "data/thumbnail/[動画ファイル名].jpg" を探します。
  // 拡張子など、個別に指定したい場合は thumbnailPath を使用してください。
  thumbnailPath: "data/thumbnail/custom.jpg",
  tags: ["Unity", "C#"],               // 技術タグ（将来の拡張用）
  date: "2024-08",                     // 制作日（将来の拡張用）
  featured: false                       // 注目作品フラグ（将来の拡張用）
}
*/

// ======= ギャラリー作品データ =======
// 
// 【構造化されたギャラリーデータ】
// カテゴリ別にオブジェクトで整理することで：
// 1. 新しい作品の追加が簡単
// 2. カテゴリごとの管理が容易
// 3. 将来的な機能拡張に対応
// 4. コードの可読性向上

const GALLERY_ITEMS = {

  // ======= 動画編集・音MAD =======
  video: [
    {
      path: "data/Do_Back_Burn.mp4",
      caption: "ひゃああっ！？うわああん！ひゃうぅぅ...",
      alt: "aaa",
      type: "video",
      link: "https://www.nicovideo.jp/watch/sm45402293",
      tags: ["音mad"],
      description: "",
      isCollab: false // 個人作
    },
    {
      path: "data/ikuyo.mp4",
      caption: "【ぼっち向け】IKUYO",
      alt: "IKUYO",
      type: "video",
      link: "https://www.nicovideo.jp/watch/sm44752007",
      tags: ["音mad"],
      description: "",
      isCollab: false // 個人作
    },
    {
      path: "data/kitan-fire.mp4",
      caption: "きたーんファイヤー☆",
      alt: "きたーんファイヤー☆",
      type: "video",
      link: "https://www.nicovideo.jp/watch/sm44922878",
      tags: ["音mad"],
      description: "",
      isCollab: false // 個人作
    },
    {
      path: "data/sm43836979.mp4",
      caption: " ",
      alt: "",
      type: "video",
      link: "https://www.nicovideo.jp/watch/sm43836979",
      tags: ["音mad"],
      description: "",
      isCollab: false // 個人作
    },
    {
      path: "data/thum_sm44717934.jpg",
      caption: "素材が被ったらパート製作者になる合作",
      alt: "素材が被ったらパート製作者になる合作",
      type: "image",
      link: "https://www.nicovideo.jp/watch/sm44717934",
      tags: ["音mad"],
      description: "",
      isCollab: true // 合作（必要に応じて true/false を変更）
    },
    {
      path: "data/thum_sm44453055.png",
      caption: "【合作】まなぶタイムきらい Campus Memories",
      alt: "【合作】まなぶタイムきらい Campus Memories",
      type: "image",
      link: "https://www.nicovideo.jp/watch/sm44453055",
      tags: ["音mad"],
      description: "",
      isCollab: true // 合作（必要に応じて true/false を変更）
    },
    {
      path: "data/thum_sm44127510.png",
      caption: "テーマ押し付けボム兵の戦場合作",
      alt: "テーマ押し付けボム兵の戦場合作",
      type: "image",
      link: "https://www.nicovideo.jp/watch/sm44127510",
      tags: ["音mad"],
      description: "",
      isCollab: true // 合作（必要に応じて true/false を変更）
    },
    {
      path: "data/thum_sm44103843.png",
      caption: "このメドレーのこの部分が好きなのでここだけ作りました！合作＋ BASIC",
      alt: "このメドレーのこの部分が好きなのでここだけ作りました！合作＋ BASIC",
      type: "image",
      link: "https://www.nicovideo.jp/watch/sm44103843",
      tags: ["音mad"],
      description: "",
      isCollab: true // 合作（必要に応じて true/false を変更）
    },
    //   {
    //     path: "data/thum_sm43981913.jpg", 
    //     caption: "07晩合作/オナ禁合作",
    //     alt: "07晩合作/オナ禁合作",
    //     type: "image",
    //     link: "https://www.nicovideo.jp/watch/sm43981913",
    //     tags: ["音mad"],
    // description: "",
    // isCollab: true // 合作（必要に応じて true/false を変更）
    //   },
    //   {
    //     path: "data/thum_sm43663959.jpg", 
    //     caption: "【二晩合作】エロい英論、エ論ｗ合作",
    //     alt: "【二晩合作】エロい英論、エ論ｗ合作",
    //     type: "image",
    //     link: "https://www.nicovideo.jp/watch/sm43663959",
    //     tags: ["音mad"],
    // description: "",
    // isCollab: true // 合作（必要に応じて true/false を変更）
    //   },
    {
      path: "data/thum_sm43407552.png",
      caption: "スーパースター合作",
      alt: "スーパースター合作",
      type: "image",
      link: "https://www.nicovideo.jp/watch/sm43407552",
      tags: ["音mad"],
      description: "",
      isCollab: true // 合作（必要に応じて true/false を変更）
    },
    {
      path: "data/thum_sm40235931.png",
      caption: "第6回柴又合作",
      alt: "柴又合作",
      type: "image",
      link: "https://www.nicovideo.jp/watch/sm40235931",
      tags: ["音mad"],
      description: "",
      isCollab: true // 合作（必要に応じて true/false を変更）
    }

    // === 新しい動画作品を追加する場合は、ここにカンマ区切りで追加 ===
    // 例:
    // ,{
    //   path: "data/new-video.mp4",
    //   caption: "新しい音MAD作品",
    //   alt: "新作音MAD",
    //   type: "video",
    //   link: "https://www.youtube.com/watch?v=new-video"
    // }
  ],

  // ======= ゲーム開発 =======
  game: [
    {
      path: "data/bocchi_suika.mp4",
      caption: "ぼっち・ざ・スイカゲーム！ - 物理演算ゲーム",
      alt: "Unityで開発した物理演算ゲーム",
      type: "video",
      link: "https://github.com/Soupon2gou/bocchi-the-suika-game",
      tags: ["Unity", "C#", "2Dアクション"],
      description: "2023年に流行ったスイカゲームをぼっち・ざ・ろっく！のキャラクターで再現しました。"
    },
    {
      path: "data/made_title.png",
      caption: "メイドインキャッスル",
      alt: "2Dアクションゲーム",
      type: "image",
      link: "https://unityroom.com/games/made-in-cas-ru",
      tags: ["アクションゲーム"],
      description: "メイドインワリオのような2Dアクションゲーム。Unityを使用して、シンプルな操作感と多彩なステージを実現。"
    }

    // === 新しいゲーム作品を追加する場合は、ここに追加 ===
  ],

  // ======= GitHubツール =======
  tools: [
    {
      path: "data/nicoSho.png",
      caption: "ニコニコスクリーンショット",
      alt: "ニコニコ動画をコメあり・コメなしでスクリーンショットを撮影",
      type: "image",
      link: "https://chromewebstore.google.com/detail/%E3%83%8B%E3%82%B3%E3%82%B7%E3%83%A7/fcadkminnhkjlnjlfdginjdihodfmbnc",
      tags: ["Chrome", "スクリプト"],
      description: "ニコニコ動画をコメあり・コメなしでスクリーンショットを撮影"
    }

    // === 新しいツールを追加する場合は、ここに追加 ===
  ],

  // ======= 研究活動 =======
  research: [
    {
      path: "data/ComplexENV_Duck.mp4",
      caption: "6DoF物体姿勢推定",
      alt: "FoundationPose研究のデモ",
      type: "video",
      link: "https://github.com/soupon2gou/foundation-pose-research",
      tags: ["コンピュータビジョン", "6DoF", "姿勢推定"],
      description: "最新の6DoF物体姿勢推定手法FoundationPoseの実装と改良。リアルタイム処理と高精度を両立。",
      isPrivate: true // 非公開設定
    },
    {
      path: "data/20250206_thesis.pdf",
      caption: "人工筋肉の湾曲配置による肘関節の性能向上",
      alt: "学士時のメカ研究",
      type: "doc",
      thumbnailPath: "data/thesis_thum.png", // PDF用カスタムサムネイル画像
      tags: ["機械学習", "リアルタイム処理", "画像解析"],
      description: "リアルタイム画像解析システムの研究開発。深層学習モデルの最適化と高速化技術。",
      isPrivate: true // 非公開設定
    }

    // === 新しい研究を追加する場合は、ここに追加 ===
  ]

  // === 新しいカテゴリを追加する場合 ===
  // 1. 上記のCATEGORIESオブジェクトに新しいカテゴリを追加
  // 2. ここに新しいカテゴリの配列を追加
  // 例:
  // ,web: [
  //   {
  //     path: "data/website.png",
  //     caption: "Webサイト制作",
  //     alt: "制作したWebサイト",
  //     type: "image"
  //   }
  // ]
};

// ======= ギャラリー配列の自動生成 =======
// 
// 【自動生成の利点】
// 1. カテゴリ情報を自動で付与
// 2. 既存のmain.jsとの互換性を保持
// 3. 将来的な拡張に対応
// 4. データの整合性を保証

const GALLERY = [];

// カテゴリごとの作品を統合してGALLERY配列を生成
Object.keys(GALLERY_ITEMS).forEach(categoryId => {
  const categoryInfo = CATEGORIES[categoryId];
  let items = GALLERY_ITEMS[categoryId];
  // 動画カテゴリのみ「個人作(isCollab:false) → 合作(isCollab:true)」の順に並び替え
  if (categoryId === 'video') {
    items = [...items].sort((a, b) => {
      const aCollab = a.isCollab ? 1 : 0;
      const bCollab = b.isCollab ? 1 : 0;
      return aCollab - bCollab; // 0 (個人) が先, 1 (合作) が後
    });
  }

  items.forEach(item => {
    // 各作品にカテゴリ情報を自動付与
    GALLERY.push({
      ...item,                           // 元の作品データをコピー
      category: categoryId,              // カテゴリIDを追加
      categoryName: categoryInfo.name,   // カテゴリ名を追加
      categoryColor: categoryInfo.color, // カテゴリ色を追加
      categoryIcon: categoryInfo.icon    // カテゴリアイコンを追加
    });
  });
});

// ======= ヘルパー関数 =======
// 
// 【便利な関数群】
// ギャラリーの操作や情報取得を簡単にする関数

// カテゴリ別の作品数を取得
function getCategoryCount(categoryId) {
  return GALLERY.filter(item => item.category === categoryId).length;
}

// 特定のカテゴリの作品のみを取得
function getItemsByCategory(categoryId) {
  return GALLERY.filter(item => item.category === categoryId);
}

// 注目作品（featured）のみを取得（将来の拡張用）
function getFeaturedItems() {
  return GALLERY.filter(item => item.featured === true);
}

// 全カテゴリの情報を取得（フィルタボタン生成用）
function getAllCategories() {
  return Object.keys(CATEGORIES).map(id => ({
    id: id,
    ...CATEGORIES[id],
    count: getCategoryCount(id)
  }));
}

// ======= 使用例とデバッグ情報 =======
// 
// 【開発者向け情報】
// ブラウザのコンソールで以下のコマンドを実行すると、
// ギャラリーの状態を確認できます：
// 
// console.log("全作品数:", GALLERY.length);
// console.log("カテゴリ情報:", getAllCategories());
// console.log("動画作品:", getItemsByCategory("video"));

// 開発モードでのデバッグ情報出力
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  console.log("=== ポートフォリオサイト デバッグ情報 ===");
  console.log("総作品数:", GALLERY.length);
  console.log("カテゴリ別作品数:", getAllCategories());
  console.log("ギャラリーデータ:", GALLERY);
}
