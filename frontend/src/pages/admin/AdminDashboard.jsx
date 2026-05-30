import React, { useState, useEffect } from "react";
import {
  FiGrid,
  FiRepeat,
  FiUsers,
  FiSearch,
  FiBell,
  FiMail,
  FiDownload,
  FiCalendar,
  FiLogOut,
  FiTrendingUp,
  FiMenu,
  FiX,
  FiChevronRight,
  FiShoppingBag,
  FiTag,
  FiTruck,
  FiSettings,
  FiUserCheck,
  FiPackage,
  FiDollarSign,
  FiRefreshCw,
} from "react-icons/fi";

import { BsGem } from "react-icons/bs";

import { MdOutlineInventory2 } from "react-icons/md";

import { RiPieChartLine } from "react-icons/ri";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Inventory from "./Inventory";
import AddProduct from "./AddProduct";
import Logout from "./LogOut";
import Coupons from "../admin/Coupon";
import Settings from "./Setting";
import Orders from "./Orders";
import Transactions from "./Transaction";
// import Seo from "./SEO";
import Customer from "./Customer";
import Collections from "./Collections";
import Notifications from "./Notifications";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <FiGrid size={18} />,
  },

  {
    id: "collections",
    label: "Collections",
    icon: <BsGem size={18} />,
  },

  {
    id: "inventory",
    label: "Inventory",
    icon: <MdOutlineInventory2 size={18} />,
  },

  {
    id: "transactions",
    label: "Transactions",
    icon: <FiRepeat size={18} />,
  },

  {
    id: "orders",
    label: "Orders",
    icon: <FiShoppingBag />,
  },

  {
    id: "coupons",
    label: "Coupons",
    icon: <FiTag />,
  },

  {
    id: "customers",
    label: "Customers",
    icon: <FiUsers />,
  },

  // {
  //   id: "seo",
  //   label: "SEO",
  //   icon: <FiTrendingUp />,
  // },

  {
    id: "notifications",
    label: "Notifications",
    icon: <FiBell />,
  },

  {
    id: "settings",
    label: "Settings",
    icon: <FiSettings />,
  },
];

const CustomTooltip = ({
  active,
  payload,
}) => {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className="bg-[#1a1a0a] border border-[#8b6b08]/40 px-4 py-3 rounded-xl shadow-xl">
        <p className="text-[10px] uppercase tracking-[2px] text-[#8b6b08] mb-1">
          MONTHLY SALES
        </p>

        <p className="text-xl font-bold text-white">
          ₹
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

export default function AdminDashboard() {
  const [active, setActive] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [chartTab, setChartTab] =
    useState("Monthly");

  const [showProduct, setShowProduct] =
    useState(false);

  const [editProduct, setEditProduct] =
    useState(null);

  const [
    showLogoutModal,
    setShowLogoutModal,
  ] = useState(false);

  const [user, setUser] =
    useState(null);

  // =========================
  // DYNAMIC STATES
  // =========================

  const [stats, setStats] =
    useState([]);

  const [
    statsBelow,
    setStatsBelow,
  ] = useState([]);

  const [chartData, setChartData] =
    useState([]);

  const [
    recentOrders,
    setRecentOrders,
  ] = useState([]);

  const [marketData, setMarketData] =
    useState([]);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchDashboard();
  }, []);

  // =========================
  // FETCH DASHBOARD
  // =========================

  const fetchDashboard =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        // ===================
        // TOP STATS
        // ===================

        setStats([
          {
            label:
              "TOTAL REVENUE",

            value: `₹${data.totalRevenue || 0}`,

            badge: "+12%",

            sub: "Overall Revenue",

            pct: 85,

            icon: (
              <FiDollarSign
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "TOTAL ORDERS",

            value:
              data.totalOrders || 0,

            badge: "+8%",

            sub: "Orders Received",

            pct: 70,

            icon: (
              <FiShoppingBag
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "TOTAL PRODUCTS",

            value:
              data.totalProducts || 0,

            badge: "+5%",

            sub: "Active Inventory",

            pct: 65,

            icon: (
              <FiPackage
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "TOTAL CUSTOMERS",

            value:
              data.totalCustomers || 0,

            badge: "+18%",

            sub: "Registered Users",

            pct: 90,

            icon: (
              <FiUsers
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },
        ]);

        // ===================
        // CHART DATA
        // ===================

        setChartData(
          data.monthlySales || []
        );

        // ===================
        // RECENT ORDERS
        // ===================

        // setRecentOrders(
        //   data.recentOrders || []
        // );

        setRecentOrders(
  (data.recentOrders || [])
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 10)
);

        // ===================
        // MARKET DATA
        // ===================

        setMarketData([
          {
            label: "Orders",
            pct:
              data.orderPercent ||
              40,
            color: "#8b6b08",
          },

          {
            label: "Products",
            pct:
              data.productPercent ||
              30,
            color: "#a07c10",
          },

          {
            label: "Customers",
            pct:
              data.customerPercent ||
              20,
            color: "#c6a53a",
          },
        ]);

        // ===================
        // BOTTOM STATS
        // ===================

        setStatsBelow([
          {
            label:
              "Pending Orders",

            value:
              data.pendingOrders ||
              0,

            sub: "Orders waiting",

            icon: (
              <FiRefreshCw
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "Delivered Orders",

            value:
              data.deliveredOrders ||
              0,

            sub:
              "Completed successfully",

            icon: (
              <FiTruck
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "Active Coupons",

            value:
              data.totalCoupons ||
              0,

            sub:
              "Coupons available",

            icon: (
              <FiTag
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "Admin Users",

            value:
              data.totalAdmins ||
              0,

            sub:
              "Management Team",

            icon: (
              <FiUserCheck
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      className="flex min-h-screen bg-[#f8f6f3]"
      style={{
        fontFamily:
          "Montserrat, sans-serif",
      }}
    >
      {/* SIDEBAR */}

      <aside
        className={`fixed lg:sticky inset-y-0 left-0 z-30 w-64 h-screen bg-[#fbf9f7] border-r border-[#e5dfd7] flex flex-col justify-between py-6 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="px-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#8b6b08] flex items-center justify-center">
                <BsGem
                  size={16}
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-xl font-bold text-black">
                  Brooches
                </p>

                <p className="text-[9px] uppercase tracking-[2px] text-[#9a9388]">
                  Master Curator
                </p>
              </div>
            </div>

            <button
              className="lg:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setActive(item.id)
                }
                className={`w-full flex items-center gap-3 px-3 py-3 text-[13px] transition-all duration-200 mb-1 ${
                  active === item.id
                    ? "bg-[#8b6b08] text-white rounded-lg"
                    : "text-[#4a4540] hover:bg-[#ede8e0] rounded-lg"
                }`}
              >
                {item.icon}

                <span>{item.label}</span>

                {active ===
                  item.id && (
                  <FiChevronRight
                    size={14}
                    className="ml-auto"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4">
          <button
            onClick={() =>
              setShowLogoutModal(true)
            }
            className="w-full flex items-center gap-3 px-3 py-3 text-[13px] text-[#4a4540] hover:bg-[#ede8e0] rounded-lg transition"
          >
            <FiLogOut size={18} />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <div className="flex-1 flex flex-col">
        {/* HEADER */}

        <header className="bg-[#fbf9f7] border-b border-[#e5dfd7] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <FiMenu size={22} />
            </button>

            <h1 className="text-2xl font-semibold">
              Dashboard
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-4 py-2 rounded-lg">
            <FiSearch />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* <button className="w-9 h-9 bg-[#f0ebe1] border rounded-lg flex items-center justify-center">
              <FiMail />
            </button> */}

            {/* <button className="w-9 h-9 bg-[#f0ebe1] border rounded-lg flex items-center justify-center">
              <FiBell />
            </button> */}
            

            <div className="hidden sm:flex items-center gap-2">
              <div className="w-9 h-9 bg-[#8b6b08] rounded-full flex items-center justify-center text-white font-bold uppercase">
                {user?.name?.charAt(
                  0
                ) || "U"}
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {user?.name}
                </p>

                <p className="text-xs text-[#8b6b08]">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD */}

        {active ===
          "dashboard" && (
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
            {/* TOP */}

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[2px] text-[#8b6b08]">
                  Portfolio Summary
                </p>

                <h2 className="text-4xl font-light">
                  Welcome back,{" "}
                  <span className="text-[#8b6b08] italic">
                    {user?.name ||
                      "Director"}
                  </span>
                </h2>
              </div>

              {/* <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#fbf9f7] border px-4 py-2 rounded-lg">
                  <FiCalendar />

                  <span>
                    Oct 1 – Oct 31
                  </span>
                </div>

                <button className="flex items-center gap-2 bg-[#8b6b08] text-white px-4 py-2 rounded-lg">
                  <FiDownload />

                  Export
                </button>
              </div> */}
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map(
                (stat, i) => (
                  <div
                    key={i}
                    className="bg-[#fbf9f7] border rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-[#f0ebe1] rounded-xl flex items-center justify-center">
                        {stat.icon}
                      </div>

                      <span className="text-xs bg-[#f0ebe1] text-[#8b6b08] px-2 py-1 rounded-full">
                        {stat.badge}
                      </span>
                    </div>

                    <p className="text-xs uppercase tracking-[1px] text-[#9a9388]">
                      {stat.label}
                    </p>

                    <p className="text-3xl font-bold mt-2">
                      {stat.value}
                    </p>

                    <div className="w-full h-1.5 bg-[#e5dfd7] rounded-full mt-4">
                      <div
                        className="h-full bg-[#8b6b08] rounded-full"
                        style={{
                          width: `${stat.pct}%`,
                        }}
                      />
                    </div>

                    <p className="text-xs mt-2 text-[#9a9388]">
                      {stat.sub}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* CHART */}

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
              <div className="bg-[#fbf9f7] border rounded-2xl p-6">
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Financial
                      Performance
                    </h3>

                    <p className="text-sm text-[#9a9388]">
                      Revenue Analytics
                    </p>
                  </div>

                  <div className="flex bg-[#f0ebe1] rounded-lg p-1">
                    {[
                      "Weekly",
                      "Monthly",
                      "Annual",
                    ].map((tab) => (
                      <button
                        key={tab}
                        onClick={() =>
                          setChartTab(
                            tab
                          )
                        }
                        className={`px-3 py-1 rounded-md ${
                          chartTab ===
                          tab
                            ? "bg-[#8b6b08] text-white"
                            : ""
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <AreaChart
                      data={
                        chartData
                      }
                    >
                      <defs>
                        <linearGradient
                          id="goldGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b6b08"
                            stopOpacity={
                              0.3
                            }
                          />

                          <stop
                            offset="95%"
                            stopColor="#8b6b08"
                            stopOpacity={
                              0
                            }
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip
                        content={
                          <CustomTooltip />
                        }
                      />

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8b6b08"
                        fill="url(#goldGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* MARKET */}

              <div className="bg-[#fbf9f7] border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <RiPieChartLine
                    size={20}
                    className="text-[#8b6b08]"
                  />

                  <h3 className="text-xl font-semibold">
                    Market
                    Distribution
                  </h3>
                </div>

                <div className="space-y-5">
                  {marketData.map(
                    (item, i) => (
                      <div
                        key={i}
                      >
                        <div className="flex justify-between mb-2">
                          <span>
                            {
                              item.label
                            }
                          </span>

                          <span>
                            {
                              item.pct
                            }
                            %
                          </span>
                        </div>

                        <div className="w-full h-2 bg-[#e5dfd7] rounded-full">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.pct}%`,
                              backgroundColor:
                                item.color,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* RECENT ORDERS */}

            <div className="bg-[#fbf9f7] rounded-xl shadow p-6">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Recent Orders
                  </h2>

                  <p className="text-sm text-[#9a9388]">
                    Latest customer
                    transactions
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[#8b6b08] border-b">
                      <th className="py-3">
                        Order ID
                      </th>

                      <th>
                        Customer
                      </th>

                      <th>Amount</th>

                      <th>Status</th>

                      <th>Payment</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map(
                      (
                        order,
                        i
                      ) => (
                        <tr
                          key={i}
                          className="border-b"
                        >
                          <td className="py-4">
                            #
                            {order._id?.slice(
                              -5
                            )}
                          </td>

                          <td>
                            {order
                              ?.shippingAddress
                              ?.fullName ||
                              "Customer"}
                          </td>

                          <td>
                            ₹
                            {
                              order.totalAmount
                            }
                          </td>

                          <td>
                            <span
                              className={`px-2 py-1 rounded-lg text-xs ${
                                order.orderStatus ===
                                "Delivered"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {
                                order.orderStatus
                              }
                            </span>
                          </td>

                          <td>
                            {order.paymentMethod ||
                              "COD"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BOTTOM STATS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {statsBelow.map(
                (stat, i) => (
                  <div
                    key={i}
                    className="bg-[#fbf9f7] border rounded-2xl p-5"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-10 h-10 bg-[#f0ebe1] rounded-xl flex items-center justify-center">
                        {stat.icon}
                      </div>

                      <div>
                        <p className="text-lg font-semibold">
                          {
                            stat.value
                          }
                        </p>

                        <p className="text-sm uppercase tracking-[1px] text-[#9a9388]">
                          {
                            stat.label
                          }
                        </p>

                        <p className="text-xs text-[#9a9388]">
                          {stat.sub}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </main>
        )}

        {/* OTHER PAGES */}

        {active ===
          "inventory" && (
          <Inventory
            setShowProduct={
              setShowProduct
            }
            setEditProduct={
              setEditProduct
            }
          />
        )}

        {showProduct && (
          <AddProduct
            setShowProduct={
              setShowProduct
            }
            editProduct={
              editProduct
            }
            setEditProduct={
              setEditProduct
            }
          />
        )}

        {active ===
          "collections" && (
          <Collections />
        )}

        {active ===
          "coupons" && (
          <Coupons />
        )}

        {active ===
          "settings" && (
          <Settings />
        )}

        {active ===
          "orders" && (
          <Orders />
        )}

        {active ===
          "transactions" && (
          <Transactions />
        )}

        {/* {active === "seo" && (
          <Seo />
        )} */}

        {active ===
          "customers" && (
          <Customer />
        )}

        {active ===
          "notifications" && (
          <Notifications />
        )}
      </div>

      {showLogoutModal && (
        <Logout
          setShowLogoutModal={
            setShowLogoutModal
          }
        />
      )}
    </div>
  );
}