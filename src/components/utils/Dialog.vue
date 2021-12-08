<template>
        <div
            class="dialog-container flex-row align-items-center justify-content-center"
        >
            <div
                class="message-container bg-white p-20"
            >
                <div>
                    {{ config['message'] }}
                </div>
                <div
                    class="mt-30 actions-container flex-row align-items-center justify-content-end"
                >
                   <template
                    v-for="(action,actionIndex) in config['actions']"
                   >
                    <span
                        :key="action['action']+'_'+actionIndex"
                        :style="getActionStyle(action)"
                        :class="[action['class']]"
                        class="ph-10 pv-5 ml-10 border-radius-3 pointer-cursor"
                        @click="$emit('action', action)"
                    >
                        {{ action['text'] }}
                    </span>
                   </template>
                </div>
            </div>
        </div>
</template>

<script>
import { eventMixin } from "../../mixins/utils/eventMixin";
export default {
  name: "Dialog",
  mixins: [eventMixin], 
  props: {
    config: {
      type: Object,
      default: null,
    }
  },
  data: function () { return {}; },
  methods: {
    getActionStyle: function (action) {
      return {};
    }
  },
};
</script>

<style lang="scss" scoped>
    .dialog-container{
        position:fixed;
        top:0;
        left:0;
        width:100vw;
        height:100%;
        background:rgba(172, 173, 173, 0.7);

        .message-container{
            min-width:100px;
            max-width:30vw;
            min-height:50px;
            box-shadow: 5px 5px 10px #aaaaaa;
            border-radius:3px;
        }
    }
</style>
