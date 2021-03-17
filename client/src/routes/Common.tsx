import { lazy } from "react";
import { Route } from "react-router";

const Profile = lazy(() => import("../pages/Profile"));
const Tagged = lazy(() => import("../pages/Tagged"));
const Image = lazy(() => import("../pages/Image"));

interface CommonProps {}

const Common = ({}: CommonProps) => {
	return (
		<>
			<Route exact path="/p/:imageId" component={Image} />
			<Route exact path="/:username" component={Profile} />
			<Route exact path="/:username/tagged" component={Tagged} />
		</>
	);
};

export default Common;
