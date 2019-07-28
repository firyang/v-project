<template>
  <div class="f-pager">
    <div class="f-pager-left">
      <div class="total-pages">
        共有
        <span>{{ op.pageVO.totalRows }}</span> 条
      </div>
      <div class="page-size">
        共有
        <span>{{ op.pageVO.totalRows }}</span> 条
      </div>
    </div>
    <div class="f-pager-right">
      <ul class="page-list">
        <li @click="curPage > 1 && change(-1)">上一页</li>
        <li :class="{current: op.pageVO.curPage === 1 && op.pageVO.totalPages > 0}" @click="op.pageVO.totalPages > 1 && change(1)">1</li>
        <li v-if="op.pageVO.curPage > op.pageCount" class="hide-page">...</li>
        <li
          :class="{current: op.pageVO.curPage === page}"
          v-for="(page, index) in pages"
          :key="'page_'+index"
          @click="change(page)"
        >{{ page }}</li>
        <li v-if="pages[pages.length-1]+1<op.pageVO.totalPages" class="hide-page">...</li>
        <li
          v-if="op.pageVO.totalPages > 1"
          :class="{current: op.pageVO.curPage === op.pageVO.totalPages}"
          @click="change(op.pageVO.totalPages)"
        >{{ op.pageVO.totalPages }}</li>
        <li @click="curPage < op.pageVO.totalPages && change(0)">下一页</li>
      </ul>
      <div class="page-moveto">
        <input type="text" v-model="curPage">
        <span @click="curPage >= 1 && curPage <= op.pageVO.totalPages && op.pageVO.totalPages > 1 && change(curPage)">GO</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pager',
  props: {
    op: {
      type: Object,
      default: () => {
        return {
          pageVO: {
            curPage: 1,
            pageSize: 6,
            totalRows: 1,
            totalPages: 1
          },
          pageCount: 5
        }
      }
    }
  },
  data () {
    return {
      pages: [],
      curPage: 1
    }
  },
  created () {
    this.getPages()
  },
  methods: {
    getPages () {
      let { pageVO, pageCount } = this.op
      let { curPage, totalPages } = pageVO
      let pages = []
      let start
      if (totalPages > 1) {
        if (curPage <= pageCount) {
          start = 2
        } else if (curPage > totalPages - pageCount) {
          start = totalPages - pageCount
        } else {
          start = curPage - 1
        }
      }

      for (let i = 0; i < pageCount; i++) {
        if (start + i === totalPages || totalPages <= 1) break
        pages.push(start + i)
      }

      this.pages = pages
      this.curPage = curPage
    },
    change (n) {
      switch (n) {
        case -1:
          this.op.pageVO.curPage -= 1
          break
        case 0:
          this.op.pageVO.curPage += 1
          break
        default:
          this.op.pageVO.curPage = parseInt(n)
      }
      this.getPages()
    }
  }
}
</script>
<style lang="less" scoped>
.f-pager {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  background: #ffffff;
  &-left {
    float: left;
    line-height: inherit;
    display: flex;
    justify-content: flex-start;
    .toal-pages {
      span {
      }
    }
    .page-size {
      span {
      }
    }
  }

  &-right {
    float: right;
    display: flex;
    justify-content: flex-end;
    .page-list {
      list-style: none;
      font-size: 0;
      li {
        font-size: 12px;
        text-align: center;
        line-height: 34px;
        display: inline-block;
        min-width: 36px;
        padding: 0 6px;
        margin: 0 3px 0 0;
        border: 1px solid #ddd;
        cursor: pointer;
        &:hover,
        &.current {
          color: #ffffff;
          background: rgb(79, 160, 253);
        }
        &.hide-page {
          border: none;
          &:hover {
            background: inherit;
            color: inherit;
          }
        }
      }
    }
    .page-moveto {
      margin-left: 12px;
      input {
        font-size: inherit;
        padding: 0;
        outline: none;
        border: 1px solid #dddddd;
        width: 46px;
        line-height: 34px;
        text-align: center;
      }
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
