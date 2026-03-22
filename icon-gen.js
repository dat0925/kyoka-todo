const { createCanvas } = require('canvas');
const fs = require('fs');

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = size;

  // 背景グラデーション（ピンク→パープル）
  const bg = ctx.createRadialGradient(s*0.4, s*0.35, s*0.05, s*0.5, s*0.5, s*0.65);
  bg.addColorStop(0, '#ffb3d1');
  bg.addColorStop(0.5, '#ff7eb3');
  bg.addColorStop(1, '#c97ef7');
  ctx.fillStyle = bg;

  // 角丸四角
  const r = s * 0.22;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(s - r, 0);
  ctx.arcTo(s, 0, s, r, r);
  ctx.lineTo(s, s - r);
  ctx.arcTo(s, s, s - r, s, r);
  ctx.lineTo(r, s);
  ctx.arcTo(0, s, 0, s - r, r);
  ctx.lineTo(0, r);
  ctx.arcTo(0, 0, r, 0, r);
  ctx.closePath();
  ctx.fill();

  // キラキラ装飾（小さい円）
  [[0.15,0.18,0.06],[0.82,0.22,0.05],[0.1,0.75,0.04],[0.88,0.78,0.055]].forEach(([x,y,r2])=>{
    ctx.beginPath();
    ctx.arc(s*x, s*y, s*r2, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fill();
  });

  // 中央の白い円
  ctx.beginPath();
  ctx.arc(s*0.5, s*0.48, s*0.3, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.fill();

  // 絵文字（🎲）
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${s*0.42}px serif`;
  ctx.fillText('🎲', s*0.5, s*0.46);

  // 下部テキスト
  ctx.font = `bold ${s*0.11}px sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fillText('ミッション', s*0.5, s*0.82);

  return canvas;
}

// 192x192
const c192 = drawIcon(192);
fs.writeFileSync('/home/claude/random-word-app/icon-192.png', c192.toBuffer('image/png'));
console.log('192 done');

// 512x512
const c512 = drawIcon(512);
fs.writeFileSync('/home/claude/random-word-app/icon-512.png', c512.toBuffer('image/png'));
console.log('512 done');
