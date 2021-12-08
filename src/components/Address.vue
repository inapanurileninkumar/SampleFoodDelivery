<template>
    <div
        class="flex-row p-20"
    >
        <div
            v-if="mode!=='view'"
            class="flex-col-1"
        >
            <span>
                <i class="fas fa-map-marker-alt" />
            </span>
        </div>
        <div
            class="flex-col-11"
        >
            <div>
                <span
                    class="text-title text-bold text-capitalized"
                >
                    {{ address['label'] }}
                </span>
            </div>
            <div
                class="mt-10"
            >
                <span
                    class="text-secondary"
                    style="font-size:10pt;"
                >
                    {{ address['address']['doorNo'] }},
                    {{ address['address']['building'] }},
                    {{ address['address']['landmark'] }},
                    {{ address['address']['area'] }},
                    {{ address['address']['state'] }},
                    {{ address['address']['pincode'] }},
                </span>
            </div>
            <div
                class="mt-30"
            >
                <span
                    class="text-title text-bold text-capitalized"
                    style="font-size:11pt;letter-spacing:1px;"
                >
                    <i
                        v-if="mode==='view'"
                        class="far fa-clock text-info mr-5"
                    />
                    {{ address['deliveryTime'] }} MINS
                </span>
            </div>
            <div
                v-if="mode!=='view'"
                class="mt-50"
            >
                <span
                    class="text-white bg-success-dark ph-20 pv-10"
                >
                    DELIVER HERE
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Address",
  props: {
    address: {
      type: Object,
      default: null,
    },
    mode: {
      type: String,
      default: "view"
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
