<template>
  <v-container class="mt-5">
    <p>Write hello</p>
    <v-text-field label="Test Input" :value="Hello" @input="updateMyProperty($event)"></v-text-field>
    <p class="mb-0">Input Value:</p>
    <span>{{ Hello }}</span>
    <p class="mt-2 mb-0">Props:</p>
    <span>{{ exampleProperty }}</span>
    <p class="mt-2 mb-0">Computed Props</p>
    <span>{{ myComputedProp }}</span>
    <p class="mt-2 mb-0">Watch:</p>
    <span class="pr-5">{{ InputValue }}</span>
    <span>{{ InputOldValue }}</span>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class TestComponent extends Vue {
  Hello = "";
  InputValue: any;
  InputOldValue : any;

  @Prop({ default: "Example" })
  exampleProperty?: string;
  @Watch('Hello')
  onPropertyChanged(value: string, oldValue: string) {
    this.InputValue = value;
    this.InputOldValue = oldValue;
    if (value === "hello"){
      alert("Hey");
    }
  }
  // Data property
  // Lifecycle hook

  mounted() {
    this.Hello = "Hello";
    console.log(this.Hello);
  }
  // Component method
  updateMyProperty($event?: any) {
    this.Hello = $event;
  }
  get myComputedProp() {
    return Math.random();
  }
}
</script>
