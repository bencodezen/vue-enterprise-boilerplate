<script>
import { playgroundComputed, playgroundMethods } from '@state/helpers'
// import { MdTable } from 'vue-material/dist/components'

export default {
  name: 'PlaygroundComp',
  //   components:{ 'md-table':MdTable},
  data() {
    return {
      dataArray: [],
    }
  },
  computed: {
    ...playgroundComputed,
  },
  async created() {
    await this.fetchDataFromServer()
    this.dataArray = [...this.getDataArray]
  },
  methods: {
    ...playgroundMethods,

    // i know v-html is dangarous security wise, the other option i thought of showing the picture
    // was with 'v-show:key !== avatar' and another <md-table-cell/> to only show the avatar.
    // i decided doing v-html because for code-readabillity and elegence

    mapValueImg(value, key) {
      return key === 'avatar' ? `<img width="70" src='${value}' />` : value
    },
  },
}
</script>

<template>
  <div>
    <md-table>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>
      <md-table-row v-if="dataArray[0]">
        <md-table-head
          v-for="(value, propertyName) in dataArray[0]"
          :key="propertyName"
          >{{ propertyName | titleFilter }}</md-table-head
        >
      </md-table-row>

      <md-table-row
        v-for="dataObj in dataArray"
        :key="dataObj.name"
        class="allrows"
      >
        <md-table-cell
          v-for="(value, propertyName) in dataObj"
          :key="propertyName"
          class="cell"
          v-html="mapValueImg(value, propertyName)"
        />
      </md-table-row>
    </md-table>
  </div>
</template>

<style lang="scss" scoped>
.cell {
  padding-left: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.allrows:hover {
  background: lightgray;
}
</style>
