const express= require("express")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const { newOrder, getMyOrder, getSingleOrder, updateOrder, deleteOrder, getAllOrders } = require("../controllers/orderController")
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder)
router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder)
router.route("/my/order").get(isAuthenticatedUser, getMyOrder)
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
router.route("/delete/order").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

module.exports = router;