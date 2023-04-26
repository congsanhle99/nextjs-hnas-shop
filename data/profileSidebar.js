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
        link: "",
      },
    ],
  },

  {
    heading: "My Orders",
    links: [
      {
        name: "All Orders",
        link: "/profile/orders?tab=2",
      },
      {
        name: "Paid Orders",
        link: "/profile/orders?filter=paid&tab=2",
      },
      {
        name: "Unpaid Orders",
        link: "/profile/orders?filter=unpaid&tab=2",
      },
      {
        name: "Processing Orders",
        link: "/profile/orders?filter=processing&tab=2",
      },
      {
        name: "Unprocessed Orders",
        link: "/profile/orders?filter=not_processed&tab=2",
      },
      {
        name: "Dispatched Orders",
        link: "/profile/orders?filter=dispatched&tab=2",
      },
      {
        name: "Delivered Orders",
        link: "/profile/orders?filter=completed&tab=2",
      },
      {
        name: "Cancelled Orders",
        link: "/profile/orders?filter=cancelled&tab=2",
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
        name: "Other Service 1",
        link: "/profile/otherservices1",
      },
      {
        name: "Other Service 22",
        link: "/profile/otherservices22",
      },
    ],
  },

  {
    heading: "Policy",
    links: [
      {
        name: "Policy 1",
        link: "/profile/policy1",
      },
      {
        name: "Policy 22",
        link: "/profile/policy2",
      },
    ],
  },
];
