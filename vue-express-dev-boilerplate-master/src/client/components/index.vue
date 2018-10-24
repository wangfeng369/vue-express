<template>
  <div class="contaniner">
    <div class="">
      <el-table :data="items" :default-sort = "{prop: 'id', order: 'ascending'}" style="width: 100%">
         <el-table-column  prop="index" label="序号" width="180">
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

    <router-view></router-view>
    <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size= pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total= totalCount>
    </el-pagination>
  </div>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        message: '您好全栈',
        items: [],
        currentPage:1,
        totalCount:0,
        pageSize:3
      }
    },
    methods: {
      handleSizeChange(val) {
        let _this = this
        _this.pageSize = val
        
        this.onload()
      },
      handleCurrentChange(val) {
        let _this = this
        _this.currentPage = val
        this.onload()
      },
      tz() {
        this.$router.push({
          path: '/Hello'
        })
      },
      onload: function(){
        let _this = this
        _this.$axios.post(_this.apiUrl+'/user/userInfo', 
          {
            currentPage:_this.currentPage,
            pageSize:_this.pageSize
          },
            {
            'Content-Type': 'application/json'
          },
        
          )
          .then(function (response) {
              response.data.data.forEach((items,index) => {
              items.index = (index + 1)+(_this.currentPage -1)*_this.pageSize
              return items
            });
            _this.items = response.data.data
            _this.totalCount = response.data.totalCount
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
