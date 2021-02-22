import { ReactiveVar, makeVar } from "@apollo/client";
import { showFooter } from "../../models/cache";

const showFooterInitialValue: showFooter = [{ showUnauthFooter: false }];

export const showFooterValue: ReactiveVar<showFooter> = makeVar<showFooter>(showFooterInitialValue);
