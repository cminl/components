<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*min-width: 1902px;*/
  /*min-height: 1080px;*/
  width: 100vw;
  height: 100vh;
}
*{
  box-sizing: border-box;
  list-style: none;
  outline: none;
  padding: 0;
  margin: 0;
}
</style>
