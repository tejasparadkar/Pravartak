import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/dashboard",
    lazy: async () => {
      const AppShell = await import("./pages/dashboard/sidebar/layout");
      return { Component: AppShell.default };
    },
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/dashboard/stats/index")).default,
        }),
      },
      {
        path: "package",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/package-details/index"))
            .default,
        }),
      },
      {
        path: "status",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/status/index")).default,
        }),
      },
      {
        path: "supplier",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/supplier/index")).default,
          routes: [
            {
              path: "details",
              lazy: async () => ({
                Component: (await import("./pages/dashboard/supplier/details"))
                  .default,
              }),
            },
          ],
        }),
      },
      {
        path: "receiver",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/receiver/index")).default,
        }),
      },
      {
        path: "customer-quot",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/customer-quot/index")).default,
        }),
      },

      // {
      //   path: "profiles",
      //   lazy: async () => ({
      //     Component: (await import("./pages/dashboard/profile/index")).default,
      //   }),
      // },
      // {
      //   path: "view-application",
      //   lazy: async () => ({
      //     Component: (await import("./pages/dashboard/view-application/index"))
      //       .default,
      //   }),
      // },
    ],
  },
  //auth
  {
    path: "/login",
    lazy: async () => ({
      Component: (await import("./pages/auth/signIn")).default,
    }),
  },
  {
    path: "/register",
    lazy: async () => ({
      Component: (await import("./pages/auth/signUp")).default,
    }),
  },

  {
    path: "/",
    lazy: async () => ({
      Component: (await import("./pages/landing/homepage")).default,
    }),
  },
  {
    path: "/bc",
    lazy: async () => ({
      Component: (await import("./App")).default,
    }),
  },
]);

export default router;
