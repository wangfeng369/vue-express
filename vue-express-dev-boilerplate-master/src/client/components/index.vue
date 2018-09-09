<template>
  <div class="contaniner">
    <div class="" style="width:500px;">
      <el-table :data="items" :default-sort = "{prop: 'id', order: 'ascending'}" style="width: 100%">
         <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="180">
          <template slot-scope='scope'>
            <p>{{scope.row.sex==0?'男':'女'}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="class.name" label="班级">
        </el-table-column>
      </el-table>
    </div>

    <button @click="get()">获取数据</button>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        message: '您好全栈',
        items: [],
       
      }
    },
    methods: {
      tz() {
        this.$router.push({
          path: '/Hello'
        })
      },
      onload: function(){
        let _this = this
        _this.$axios.post('/user/userInfo', {
            'Content-Type': 'application/json'
          })
          .then(function (response) {

            for(let i=0;i<response.data.lenght;i++){
              console.log(response.data[i])
            }
          
            _this.items = response.data
          })
          .catch(function (error) {});
      }
    },
    mounted:function(){
      this.onload();
    }
  }
</script>

<style scoped>
  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
