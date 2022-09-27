---
type: JumboHeader
order: 0
disabled: false
---

<style>
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
.hackerman {
    text-align: left !important;
    position: relative;
}
.hackerman * {
    display: inline-block;
    font-family: "JetBrains Mono";
}
.hackerman.prompt :first-child {
    margin-left: 1.2ch;
}
.hackerman.prompt:after {
    display: inline-block;
    width: 100%;
    height: 2px;
    border: 1px inset white;
    border-radius: 2px;
    position: absolute;
    bottom: -10px;
    content: '';
    left: 6px;
}
.hackerman.prompt:before {
    fill: #FFF;
    animation: blinker 1s step-end infinite;
    content: url("data:image/svg+xml,%3Csvg class='before' fill='white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath d='M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z'/%3E%3C/svg%3E");
    position: absolute;
    left: 0;
    top: 5px;
    text-align: left;
    width: .8ch;
}
</style>
<h1 class="hackerman prompt"><strong>avrami</strong></h1>
<span class="hackerman output">
Designing scalable systems across the full software stack for a wide range of industries
</span>
