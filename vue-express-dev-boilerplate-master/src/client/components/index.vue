<template>
	<div class="contaniner">
		<div class="" style="width:100%;">
			<el-table :data="items" :default-sort="{prop: 'id', order: 'ascending'}" style="width: 100%">
				<el-table-column prop="index" label="序号" width="180">
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
		<el-upload class="upload-demo" action="" :on-preview="handlePreview" :on-remove="handleRemove"
		 :before-remove="beforeRemove" :before-upload="beforeUpload" multiple :limit="3" :on-exceed="handleExceed"
		 :http-request="fileAxios">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
		<router-view></router-view>
		<div class="block">
			<span class="demonstration">完整功能</span>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[1, 2, 3, 4]" :page-size=pageSize layout="total, sizes, prev, pager, next, jumper" :total=totalCount>
			</el-pagination>
		</div>
	</div>

</template>

<script>
	import Vue from 'vue'

	export default {
		data() {
			return {
				message: '您好全栈',
				items: [],
				currentPage: 1,
				totalCount: 0,
				pageSize: 3
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
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			beforeUpload(file, fileList) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			tz() {
				this.$router.push({
					path: '/Hello'
				})
			},
			onload: function () {
				let _this = this
				let _token = sessionStorage.getItem('token')
				console.log(_token)
				_this.$axios.post(_this.apiUrl + '/user/userInfo', {
							currentPage: _this.currentPage,
							pageSize: _this.pageSize
						}
					)
					.then(function (response) {
						response.data.data.forEach((items, index) => {
							items.index = (index + 1) + (_this.currentPage - 1) * _this.pageSize
							return items
						});
						_this.items = response.data.data
						_this.totalCount = response.data.totalCount
					})
					.catch(function (error) {});
			},
			fileAxios: function (file,fileList) {
				let _this = this
				let formData = new FormData()
				formData.append('file',file.file,file.file.name)
				_this.$axios.post(_this.apiUrl + '/file/file',formData,
					{ "content-type": false}
				).then(function (response) {
						console.log(response)
					})
				.catch(function (error) {
					console.log(error)
				});
			},
			change: function () {
				console.log('1111')
			}
		},

		mounted: function () {
			this.onload();

		},
		created: function () {

		},
		updated: function () {

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