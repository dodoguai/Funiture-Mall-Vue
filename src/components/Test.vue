<template>
  <div>test</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        attributeCategoryId: "",
        brandId: "",
        brandName: "",
        categoryId: "",
        description: "",
        isValid: "",
        name: "",
        pic: "",
        price: 0,
        publishStatus: 0,
        sale: 0,
        skuStockList: [
          {
            id: "",
            lockStock: 0,
            pic: "",
            price: 0,
            properties: "",
            sale: 0,
            spuId: "",
            stock: 0,
          },
        ],
        sort: 0,
        stock: 0,
        title: "",
        weight: 0,
      },
    };
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='css' scoped>
</style>