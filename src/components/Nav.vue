<template>
<div>
  <div class="es-menu">
    <button v-on:click.stop="extendMenu()">extend menu</button>
    <ul class="es-menu-box">
      <li v-for="(f, i) in menuList" :key="'f_'+i">
        <span :class="{active: f.actived}" v-on:click.stop="handleClick(f.id,f.children && f.children.length>0)">{{f.name}}
          <i class="iconfont icon-jiantou" v-if="f.children && f.children.length>0"></i>
        </span>
        <ul v-if="f.children && f.children.length>0" :style="{height: f.extend ? f.heigth+'px' : 0}">
          <li v-for="(s, i) in f.children" :key="'s_'+i">
            <span :class="{active: s.actived}" v-on:click.stop="handleClick(s.id,s.children && s.children.length>0, s.path)">{{s.name}}
              <i class="iconfont icon-jiantou" v-if="s.children && s.children.length>0"></i>
            </span>
            <ul v-if="s.children && s.children.length>0" :style="{height: s.extend ? 'auto' : 0}">
              <li v-for="(t, i) in s.children" :key="'t_'+i">
                <span :class="{active: t.actived}" v-on:click.stop="handleClick(t.id)">{{t.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      menuList: [
        {
          name: 'Menu',
          id: 'nav1',
          actived: false,
          children: [
            { name: 'Home', id: 'nav10', path: '/', actived: false },
            { name: 'Demo', id: 'nav11', path: '/demo', actived: false },
            { name: 'Export', id: 'nav12', path: '/export', actived: false },
            { name: 'Download', id: 'nav14', path: '/download', actived: false },
            { name: 'Upload', id: 'nav15', path: '/upload', actived: false },
            { name: 'FlowSheet', id: 'nav13', path: '/flowSheet', actived: false }
          ],
          extend: false,
          heigth: 160
        },
        {
          name: 'nav2222222222',
          id: 'nav2',
          actived: false,
          children: [
            { name: 'nav222_11111', id: 'nav21', actived: false },
            { name: 'nav222_22222', id: 'nav22', actived: false },
            { name: 'nav222_33333', id: 'nav23', actived: false },
            { name: 'nav222_44444', id: 'nav24', actived: false },
            { name: 'nav111_33333',
              id: 'nav14',
              actived: false,
              children: [
                { name: 'nav111_33333_1', id: 'nav131', actived: false },
                { name: 'nav111_33333_2', id: 'nav132', actived: false }
              ],
              extend: false,
              heigth: 80
            }
          ],
          extend: false,
          heigth: 200
        },
        {
          name: 'nav3333333333',
          id: 'nav3',
          actived: false,
          children: [
            { name: 'nav333_11111', id: 'nav31', actived: false },
            { name: 'nav333_22222', id: 'nav32', actived: false },
            { name: 'nav333_33333', id: 'nav33', actived: false }
          ],
          extend: false,
          heigth: 120
        }
      ]
    }
  },
  methods: {
    handleClick (id, enableExtend, path) {
      let menuList = JSON.parse(JSON.stringify(this.menuList))
      this.activeMenu(id, menuList)

      if (enableExtend) {
        this.collapse(id, menuList)
      }
      this.menuList = menuList
      if (path) {
        this.$router.push({ path: path })
      }
    },
    collapse (id, menuList) {
      menuList.forEach(item => {
        if (id === item.id && !item.extend) {
          item.extend = true
        } else if (item.children && item.children.length > 0) {
          let second = item.children
          let i
          let elem
          for (i = 0; i < second.length; i++) {
            elem = second[i]
            if (id === elem.id) {
              elem.extend = !elem.extend
              if (elem.extend) {
                item.heigth += elem.heigth
              } else {
                item.heigth -= elem.heigth
              }
              break
            }
          }
          if (i === second.length) {
            item.extend = false
          }
        }
      })
    },
    activeMenu (id, menuList) {
      menuList.forEach(item => {
        item.actived = (id === item.id)
        if (item.children && item.children.length > 0) {
          this.activeMenu(id, item.children)
        }
      })
    },
    extendMenu (id) {
      id = id || 'nav131'
      let fid
      let ffid
      let fextend
      let ffextend
      let menuList = JSON.parse(JSON.stringify(this.menuList))
      menuList.forEach(item => {
        if (item.children && item.children.length > 0) {
          let second = item.children
          for (let i = 0; i < second.length; i++) {
            let elem = second[i]
            if (id === elem.id) {
              ffid = item.id
              ffextend = item.extend
              break
            }
            if (elem.children && elem.children.length > 0) {
              let three = elem.children
              for (let j = 0; j < three.length; j++) {
                if (id === three[j].id) {
                  fid = elem.id
                  ffid = item.id
                  fextend = elem.extend
                  ffextend = item.extend
                  break
                }
              }
            }
          }
        }
      })
      ffid && !ffextend && this.collapse(ffid, menuList)
      fid && !fextend && this.collapse(fid, menuList)
      this.activeMenu(id, menuList)
      this.menuList = menuList
    }
  }
}
</script>
<style lang="less" scoped>
ul,dl{
    list-style: none;
    margin: 0;
    padding: 0;
}
.es-menu{
  width: 220px;
  background: #eeeeee;
  &-box{
    li{
      span{
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 16px;
        position: relative;
        cursor: pointer;
        &.active,
        &:hover{
          background:#afd;
          color: #d0d;
        }
        i{
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      ul{
        overflow: hidden;
        transition: all 0.5s;
        li{
          span{
            padding-left: 32px;
          }
          ul{
            transition: all 0.5s;
            li{
              span{
                padding-left: 48px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
