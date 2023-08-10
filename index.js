
// ページの読み込みを待つ
window.addEventListener('load', init);

// canvasのサイズを指定
const width = window.innerWidth; //ウインドウの横の長さ
const height = 400; //エリアの縦の長さ

function init() {
// シーンを作る
const scene = new THREE.Scene();

// カメラを作る
const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, 1000); // x,y,z座標でカメラの場所を指定

// レンダラーを作る
const canvasElement = document.querySelector('#canvas') //HTMLのcanvasのid
const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement,
  alpha: true, //背景を透明にする
  antialias: true, //アンチエイリアス
});
// renderer.setSize(width, height); //サイズ

// ライトを作る
const light = new THREE.AmbientLight(0xFFFFFF, 1); //環境光源（色、光の強さ）
scene.add(light);

// 画像
const loader = new THREE.TextureLoader();
const texture01 = loader.load('./img/01.png');
const texture02 = loader.load('./img/02.png');
const texture03 = loader.load('./img/03.png');
const texture04 = loader.load('./img/04.png');
const texture05 = loader.load('./img/05.png');

const textures = [
  texture01,
  texture02,
  texture03,
  texture04,
  texture05,
]

// 3Dオブジェクトを作る
const geometry = new THREE.DodecahedronGeometry(300, 0); // DodecahedronGeometry 正十二面体（半径、詳細）

// 枠線を作成
const line = new THREE.LineSegments(
  new THREE.EdgesGeometry(geometry), // 線
  new THREE.LineBasicMaterial({
    color: 0x000000, // 線の色
  }),
);

const material = new THREE.MeshPhongMaterial({
  map: texture01,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.add(line);
scene.add(mesh);

// マウス
let mouseX = 0, mouseY = 0; // マウス座標

let windowHalfX = window.innerWidth / 2;
let windowHalfY = 200;

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}
document.addEventListener('mousemove', onDocumentMouseMove);

// アニメ―ション
function start() {
  requestAnimationFrame(start);

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (- mouseY - camera.position.y) * 0.05;
  // 原点方向を見つめる
  camera.lookAt(scene.position);

  //球体が回転する
  mesh.rotation.y += 0.005;
  mesh.rotation.x += 0.005;

  // レンダリング
  renderer.render(scene, camera);
}
start();

// ウインドウのリサイズ対応
onWindowResize();
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
// ウインドウ幅を取得
const width = window.innerWidth;
  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, 400);

  windowHalfX = window.innerWidth / 2;
  windowHalfY = 200;

  // カメラのアスペクト比を正す
  camera.aspect = width / 400;
  camera.updateProjectionMatrix();
}

// 多面体の画像切り替え
let count = -1;
imgChange();
function imgChange() {
  count++;
  // カウントが画像の枚数と同じになると0に戻る
  if (count == textures.length) count = 0;
  material.map = textures[count];
  setTimeout(imgChange,4000)
  const switching = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      },time)
    })
  } 
    switching() 
    .then(() => {
      kvElement.classList.remove("fadeInObj");
      return switching(2000)  
    }).then(() => {
      kvElement.classList.add("fadeInObj")
      return switching(4000)
      })
    }

// KV背景の画像切り替え
const backgrounds = [
  "./img/05.png",
  "./img/01.png",
  "./img/02.png",
  "./img/03.png",
  "./img/04.png",
]
const kvElement = document.querySelector('.kv-block') //HTMLののid
bgChange();
function bgChange() {
  count++;
  // カウントが画像の枚数と同じになると0に戻る
  if (count == backgrounds.length) count = 0;
  kvElement.style.backgroundImage = 'url(' + backgrounds[count] + ')';
  setTimeout(bgChange, 4000);
  setTimeout(function () {
    setTimeout(function () {
      kvElement.classList.remove("fadeInBg");
    }, 2000),
      kvElement.classList.add("fadeInBg")
  }, 4000);
  }
}
