<template>
	<el-dialog v-model="dialog" :title="title" width="800px" center>
		<el-container>
			<el-main>
				<!-- 主题 -->
				<div class="title">{{message.message_title}}</div>
				<!-- 内容 -->
				<div class="content" v-html="message.message_content"></div>
			</el-main>
			<el-aside width="200px">
				<div class="publish-msg" v-if="title.value=='公司公告'">发布部门：{{message.message_publish_department}}</div>
				<div class="publish-msg">发布人：{{message.message_publish_name}}</div>
				<div class="publish-msg">类别：{{message.message_category}}</div>
				<div class="publish-msg" v-if="title.value=='公司公告'">等级：
					<el-tag class="mx-1" round v-if="message.message_level=='一般'">{{message.message_level}}</el-tag>
					<el-tag type="warning" class="mx-1" round
						v-if="message.message_level=='重要'">{{message.message_level}}</el-tag>
					<el-tag type="danger" class="mx-1" round
						v-if="message.message_level=='必要'">{{message.message_level}}</el-tag>
				</div>
				<div class="publish-msg">发布时间：{{message.message_publish_time?.slice(0,10)}}</div>
			</el-aside>
		</el-container>
	</el-dialog>
</template>

<script lang='ts' setup>
	import {
		reactive,
		ref,
		onBeforeUnmount
	} from 'vue'
	import {
		bus
	} from "@/utils/mitt.js"
	const title = ref()
	bus.on('homeCompany', (row: any) => {
		title.value = '公司公告'
		message.message_title = row.message_title
		message.message_content = row.message_content
		message.message_publish_department = row.message_publish_department
		message.message_category = row.message_category
		message.message_level = row.message_level
		message.message_publish_name = row.message_publish_name
		message.message_publish_time = row.message_publish_time
	})

	bus.on('homeSystem', (row: any) => {
		title.value = '系统消息'
		message.message_title = row.message_title
		message.message_content = row.message_content
		message.message_publish_department = row.message_publish_department
		message.message_category = row.message_category
		message.message_level = row.message_level
		message.message_publish_name = row.message_publish_name
		message.message_publish_time = row.message_publish_time
	})

	interface Message {
		message_title: string;
		message_content: string;
		message_publish_department: string;
		message_category: string;
		message_level: string;
		message_publish_name: string;
		message_publish_time: string;
	}

	const message: Message = reactive({
		message_title: '',
		message_content: '',
		message_publish_department: '',
		message_category: '',
		message_level: '',
		message_publish_name: '',
		message_publish_time: '',
	})

	// 弹窗默认为false
	const dialog = ref(false)
	// 暴露open
	const open = () => {
		dialog.value = true
	}
	defineExpose({
		open
	})

	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>

<style lang="scss" scoped>
	.el-main {
		min-height: 500px;
		--el-main-padding: 0px;
		border-right: 1px solid #eee;
	}

	.el-aside {
		padding-right: 8px;
	}

	.title {
		height: 32px;
		line-height: 32px;
		font-size: 16px;
		margin-bottom: 8px;
		margin-left: 8px;
		border-bottom: 1px solid #eee;
	}

	.content {
		text-align: center;
	}

	.publish-msg {
		height: 32px;
		line-height: 32px;
		font-size: 16px;
		margin-bottom: 8px;
		margin-left: 8px;
		border-bottom: 1px solid #eee;
	}
</style>