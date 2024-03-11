/*
 * @Author: 'yang' '1173278084@qq.com'
 * @Date: 2024-03-10 22:37:20
 * @LastEditors: 'yang' '1173278084@qq.com'
 * @LastEditTime: 2024-03-11 20:56:48
 * @FilePath: \Web-General-background-management-system-background\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		redirect: "/menu",
	},
	{
		name: "login",
		path: "/login",
		component: () => import("@/views/login/index.vue"),
	},
	{
		name: "menu",
		path: "/menu",
		component: () => import("@/views/menu/index.vue"),
		children: [
			{
				name: "home",
				path: "/home",
				component: () => import("@/views/home/index.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;