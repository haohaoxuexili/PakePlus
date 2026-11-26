window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// ========== 新增：页面默认缩放 + 关闭收托盘 ==========
// 默认缩放90%，不需要缩放就删掉这一行
document.body.style.zoom = "0.9";

// 点X不退出，隐藏到托盘
window.__TAURI__.app.onCloseRequested(async (event) => {
  event.preventDefault();
  await window.__TAURI__.window.appWindow.hide();
});

// 创建托盘右键菜单
window.__TAURI__.tray.new({
  icon: "icon.ico",
  menuItems: [
    { id: "show", text: "打开窗口" },
    { id: "quit", text: "彻底退出" }
  ]
});

// 托盘菜单点击逻辑
window.__TAURI__.tray.onMenuItemClick(async (item) => {
  if (item.id === "show") {
    await window.__TAURI__.window.appWindow.show();
  } else if (item.id === "quit") {
    await window.__TAURI__.app.exit();
  }
});