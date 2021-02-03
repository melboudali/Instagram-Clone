import { useEffect, useState } from "react";
import { MeQuery, useMeQuery } from "../generated/graphql";

const IsAuth = () => {
	const { data, loading } = useMeQuery();
	const [meData, setMeData] = useState<MeQuery>();
	const [isAuth, setIsAuth] = useState<boolean>(false);

	useEffect(() => {
		if (data && data?.me && !loading) {
			setIsAuth(true);
			setMeData(data);
		} else {
			setIsAuth(false);
		}
	}, [data?.me, loading, data]);
	return [meData, isAuth];
};

export default IsAuth;
