<!--
 * @Author: 'yang' '1173278084@qq.com'
 * @Date: 2024-04-14 15:21:14
 * @LastEditors: 'yang' '1173278084@qq.com'
 * @LastEditTime: 2024-04-14 15:21:24
 * @FilePath: \Web-General-background-management-system-background\src\views\user_manage\components\promote.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-dialog
		v-model="dialogPromoteVisible"
		title="赋权操作"
		center
		width="30%"
	>
		<el-radio-group v-model="radio" class="ml-4">
			<el-radio label="产品管理员" size="large">产品管理员</el-radio>
			<el-radio label="用户管理员" size="large">用户管理员</el-radio>
			<el-radio label="消息管理员" size="large">消息管理员</el-radio>
		</el-radio-group>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="yes"> 确定 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { bus } from "@/utils/mitt";
import { changeIdentityToAdmin } from "@/api/userinfor";
import { ElMessage } from "element-plus";
const userid = ref();
bus.on("promoteId", (id: number) => {
	userid.value = id;
});
const radio = ref();

const yes = async () => {
	const res = (await changeIdentityToAdmin(userid.value, radio.value)) as any;
	if (res.status == 0) {
		ElMessage({
			message: "赋权管理员成功",
			type: "success",
		});
		bus.emit("offDialog", 1);
		dialogPromoteVisible.value = false;
	} else {
		ElMessage.error("赋权管理员失败");
		dialogPromoteVisible.value = false;
	}
};

// 弹窗开关
const dialogPromoteVisible = ref(false);

// 打开编辑管理员的弹窗
const open = () => {
	dialogPromoteVisible.value = true;
};

defineExpose({
	open,
});
</script>

<style lang="scss" scoped>
.el-radio-group {
	display: flex;
	justify-content: center;
}
</style>
