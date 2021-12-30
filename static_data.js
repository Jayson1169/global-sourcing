const role_list = ["管理员", "销售员", "采购员", "仓管员", "转运员", "财务员"]

const role_map = {"ADMIN": ["管理员", 0], "SALESPERSON": ["销售员", 1], "BUYER": ["采购员", 2], "WAREHOUSE_KEEPER": ["仓管员", 3], "TRANSPORTER": ["转运员", 4], "TREASURER": ["财务员", 5]}

const roleList = {
				"ADMIN": '/pages/Home', 
				"BUYER": '/pages/purchase/Purchaser',
				"SALESPERSON": '/pages/order/Order',
				"WAREHOUSE_KEEPER": '/pages/warehouse/WarehouseKeeper',
				"TRANSPORTER": '/pag es/transport/Transporter',
				"TREASURER": '/pages/statistics/Statistics'
			}

export default {
	role_list,
	role_map,
	roleList
}
