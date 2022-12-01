<template>
   <div>
      <component :is="layout"/>
   </div>
</template>
<script>
export default {
   computed: {
      layout() {
         const layoutName = this.$route.meta.layout
         return () => import(`@/layouts/${layoutName}.vue`)
      }
   },
}
</script>
<style lang="scss">
</style>