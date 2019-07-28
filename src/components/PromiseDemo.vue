<template>
  <div>
    <h2>Promise Demo</h2>
  </div>
</template>
<script>
import { get } from 'http';

export default {
  components: {},
  data () {
    return { }
  },
  created () {
    this.asyncVSpromise()
  },
  methods: {
    promise(){
      let promise = new Promise((resolve, reject)=>{
        setTimeout(() => {
          let num = parseInt(Math.random()*100)
          if(num>50){
            resolve(num)
          }else{
            reject(num)
          }
        }, 1000);
      })

      promise.then(res => {
        console.log('res---',res)
      }, err=>{
        console.log('err---',err)
      })
    },
    promiseAll(){
      let promise1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(1)
        },5000)
      })
      
      let promise2 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(2)
        },2000)
      })

      let promise3 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(3)
        },4000)
      })

      Promise.all([promise1,promise2,promise3]).then(res=>{
        console.log(res)
      })
    },
    promiseAll1(){
      let promise1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          reject(1)
        },5000)
      })
      
      let promise2 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(2)
        },2000)
      })

      let promise3 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(3)
        },4000)
      })

      Promise.all([promise1,promise2,promise3]).then(res=>{
        console.log(res)
      },err=>{
        console.log(err)
      })
    },
    promiseRace(){
      let promise1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          reject(1)
        },1000)
      })
      
      let promise2 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(2)
        },2000)
      })

      let promise3 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(3)
        },4000)
      })

      Promise.race([promise1,promise2,promise3]).then(res=>{
        console.log('resoled-->',res)
      },err=>{
        console.log('rejected-->',err)
      })
    },
    asyncDemo(){
      async function fn(){
        let result = await new Promise((resolve, reject)=>{
          setTimeout(()=>{
            resolve(100)
          },5000)
        })

        return result
      }
    
      let a = fn()
      a.then(res=>{
        console.log('resolved-->', res)
      },err=>{
        console.log('rejected-->', err)
      })
    },
    asyncDemo1(){
      async function timeout(flag){
        if(flag){
          return 'resovled'
        }else{
          return 'rejected'
        }
      }

      timeout(true).then(res=>{
        console.log(res)
      })

      timeout(false).catch(err=>{
        console.log(err)
      })
    },
    asyncVSpromise(){
      function getDate(){
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            resolve({d:'2019-7-13', key: 'pm'})
          },5000)
        })
          
      }
      
      function getTime(key){
        let obj = { am: '10:20:06', pm:'19:05:23'}
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            resolve(obj[key])
          },2000)
        })
      }

      function fetchDate(){
        getDate().then(dres=>{
          let { d, key } = dres
          if(key){
            getTime(key).then(tres=>{
              if(tres){
                console.log('Date is '+ d + ' ' + tres)
              }
            })
          }
        })
      }

      fetchDate()
    },
    asyncANDawait(){
      function getDate(){
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            resolve({d:'2019-7-13', key: 'pm'})
          },5000)
        })
          
      }
      
      function getTime(key){
        let obj = { am: '10:20:06', pm:'19:05:23'}
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            resolve(obj[key])
          },2000)
        })
      }

      async function fetchDate(){
        try{
          let dateObj = await getDate()
          let { d, key } = dateObj
          let t
          if(key){
            t = await getTime(key)
          }
          console.log('Date is '+ d + ' ' + t )
        }catch(err){
          console.log(err)
        }
      }

      fetchDate()
    }
  }
}
</script>
