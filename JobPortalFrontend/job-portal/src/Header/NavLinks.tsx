import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Find Job", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    { name: "Post Job", url: "post-job" },
    { name: "Posted Job", url: "posted-job" },
    { name: "Job History", url: "job-history" },
    // { name: "SignUp", url: "signup" },
  ];

  const location = useLocation();

  return (
    <div className="flex gap-9 text-mine-shaft-200 h-full items-center">
      {links.map((link, index) => (
        <div key={index}>
          <Link to={link.url}>{link.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
