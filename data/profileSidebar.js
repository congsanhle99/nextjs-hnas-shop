export const sidebarData = [
  {
    heading: "My Account",
    links: [
      {
        name: "My Profile",
        link: "/profile",
      },
      {
        name: "Addresses",
        link: "/profile/address",
      },
      {
        name: "My Payment Options",
        link: "/profile/payment",
      },
      {
        name: "Account Security",
        link: "/profile/security",
      },
    ],
  },

  {
    heading: "My Orders",
    links: [
      {
        name: "All Orders",
        link: "/profile/orders",
        filter: "",
      },
      {
        name: "Paid Orders",
        link: "/profile/orders",
        filter: "Paid",
      },
      {
        name: "Unpaid Orders",
        link: "/profile/orders",
        filter: "Unpaid",
      },
      {
        name: "Processing Orders",
        link: "/profile/orders",
        filter: "Processing",
      },
      {
        name: "Unprocessed Orders",
        link: "/profile/orders",
        filter: "Not Processed",
      },
      {
        name: "Dispatched Orders",
        link: "/profile/orders",
        filter: "Dispatched",
      },
      {
        name: "Delivered Orders",
        link: "/profile/orders",
        filter: "Completed",
      },
      {
        name: "Cancelled Orders",
        link: "/profile/orders",
        filter: "Cancel",
        // filter: "Cancelled",
      },
    ],
  },

  {
    heading: "My Lists",
    links: [
      {
        name: "Whishlist",
        link: "/profile/wishlist",
      },
      {
        name: "Recently Viewed",
        link: "/profile/recent",
      },
    ],
  },

  {
    heading: "Customer Service",
    links: [
      {
        name: "My Message",
        link: "/profile/messages",
      },
      {
        name: "Service Records",
        link: "/profile/services",
      },
    ],
  },

  {
    heading: "Other Service",
    links: [
      {
        name: "Survey Center",
        link: "",
      },
      {
        name: "Contact Preferences",
        link: "",
      },
    ],
  },

  {
    heading: "Policy",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Privacy & Cookie Policy",
        link: "",
      },
    ],
  },

  {
    heading: "Sign out",
    links: [],
  },
];

export const ordersLinks = [
  {
    name: "All Orders",
    filter: "",
  },
  {
    name: "Paid Orders",
    filter: "paid",
  },
  {
    name: "Unpaid Orders",
    filter: "unpaid",
  },
  {
    name: "Processing Orders",
    filter: "Processing",
  },
  {
    name: "Unprocessed Orders",
    filter: "Unprocessed",
  },
  {
    name: "Dispatched Orders",
    filter: "Dispatched",
  },
  {
    name: "Delivered Orders",
    filter: "Delivered",
  },
  {
    name: "Cancelled Orders",
    filter: "Cancelled",
  },
];
