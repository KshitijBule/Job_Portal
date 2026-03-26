import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHierarchy2,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const navigate = useNavigate();
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  useEffect(() => {
    setupResponseInterceptor(navigate, dispatch);
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded: any = jwtDecode(token);
    dispatch(setUser({ id: decoded.id, email: decoded.sub }));
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    getProfile(user.id)
      .then((data: any) => dispatch(setProfile(data)))
      .catch((error: any) => console.log(error));
  }, [user]);

  if (
    location.pathname === "/signup" ||
    location.pathname === "/login"
  ) {
    return <></>;
  }

  return (
    <>
      {/* ── MAIN HEADER ── */}
      <div className="w-full h-16 sm:h-20 bg-mine-shaft-950 font-['poppins'] px-4 sm:px-6 text-white flex justify-between items-center sticky top-0 z-50 shadow-md">

        {/* Logo */}
        <Link to="/" className="flex gap-2 sm:gap-3 items-center text-bright-sun-400 shrink-0">
          <IconHierarchy2 className="h-7 w-7 sm:h-9 sm:w-10" stroke={2.5} />
          <span className="text-2xl sm:text-4xl font-bold">HireME</span>
        </Link>

        {/* Desktop Nav — hidden on mobile */}
        <nav className="hidden lg:flex">
          {NavLinks()}
        </nav>

        {/* Right-side actions */}
        <div className="flex gap-3 sm:gap-5 items-center">

          {/* Auth / Profile — desktop */}
          <div className="hidden sm:flex items-center gap-3">
            {user?.id ? (
              <>
                <span className="text-white font-medium text-sm sm:text-base truncate max-w-[120px] md:max-w-[180px]">
                  {profile?.name || "User"}
                </span>
                <ProfileMenu />
              </>
            ) : (
              <Link to="/login">
                <Button variant="subtle" color="yellow.5" size="sm">Login</Button>
              </Link>
            )}
          </div>

          {/* Notification bell */}
          {user?.id && (
            <div className="hidden sm:flex">
              <NotiMenu />
            </div>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden flex items-center justify-center bg-mine-shaft-900 p-2 rounded-full focus:outline-none"
            onClick={openDrawer}
            aria-label="Open menu"
          >
            <IconMenu2 stroke={1.8} className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="75%"
        position="right"
        withCloseButton={false}
        styles={{
          body: { padding: 0, backgroundColor: "#0f0f0f", height: "100%" },
          content: { backgroundColor: "#0f0f0f" },
        }}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-mine-shaft-800">
          <div className="flex gap-2 items-center text-bright-sun-400">
            <IconHierarchy2 className="h-7 w-7" stroke={2.5} />
            <span className="text-2xl font-bold font-['poppins'] text-bright-sun-400">HireME</span>
          </div>
          <button
            onClick={closeDrawer}
            className="bg-mine-shaft-900 p-2 rounded-full"
            aria-label="Close menu"
          >
            <IconX className="h-5 w-5 text-white" stroke={1.8} />
          </button>
        </div>

        {/* Nav Links */}
        <div
          className="px-5 py-4 flex flex-col gap-1 border-b border-mine-shaft-800"
          onClick={closeDrawer}
        >
          {NavLinks()}
        </div>

        {/* User section */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {user?.id ? (
            <div className="flex items-center gap-3">
              <ProfileMenu />
              <span className="text-white font-medium text-sm truncate">
                {profile?.name || "User"}
              </span>
            </div>
          ) : (
            <Link to="/login" onClick={closeDrawer}>
              <Button variant="subtle" color="yellow.5" fullWidth>
                Login
              </Button>
            </Link>
          )}

          {user?.id && <NotiMenu />}
        </div>
      </Drawer>
    </>
  );
};

export default Header;