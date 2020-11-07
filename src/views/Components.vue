<template>
  <div>
    <TestComponent example-property="Props Example" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TestComponent from "@/components/TestComponent.vue"; // @ is an alias to /src

@Component({
  components: {
    TestComponent
  }
})
export default class Components extends Vue {}
</script>
