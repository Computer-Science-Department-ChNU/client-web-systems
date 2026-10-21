import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useParams,
} from "react-router";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// Declarative mode
function Dashboard() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export function DeclarativeApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<h2>Dashboard Home</h2>} />
          <Route path="settings" element={<Settings />} />
          <Route path="users/:id" element={<UserDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Data mode
const router = createBrowserRouter([
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      { index: true, Component: DashboardHome },
      { path: "settings", Component: Settings },
      { path: "users/:id", Component: UserDetails },
    ],
  },
  { path: "/login", Component: Login },
  { path: "*", Component: NotFound },
]);

export function DataApp() {
  return <RouterProvider router={router} />;
}

function UserDetails() {
  const { id } = useParams();
  return <h2>User {id}</h2>;
}

function DashboardHome() {
  return <h2>Dashboard</h2>;
}

function Settings() {
  return <h2>Settings</h2>;
}

function Login() {
  return <h2>Login</h2>;
}

function NotFound() {
  return (
    <div>
      <h2>404 — Page Not Found</h2>
      <Link to="/dashboard">Go to dashboard</Link>
    </div>
  );
}

// Data mode: protected route via loader
async function getCurrentUser(_request: Request) {
  // Replace with the real session lookup.
  return { id: "1", role: "admin" } as
    | { id: string; role: string }
    | null;
}

async function requireUser({ request }: { request: Request }) {
  const user = await getCurrentUser(request);

  if (!user) {
    const url = new URL(request.url);
    throw new Response(null, {
      status: 302,
      headers: {
        Location:
          "/login?redirectTo=" +
          encodeURIComponent(url.pathname + url.search),
      },
    });
  }

  return user;
}

export const protectedRouter = createBrowserRouter([
  {
    path: "/admin",
    loader: requireUser,
    Component: Dashboard,
    children: [
      { index: true, Component: DashboardHome },
      { path: "settings", Component: Settings },
    ],
  },
]);
