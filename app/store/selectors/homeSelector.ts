import { RootState } from "..";

export default (homeId: number) => (state: RootState) => state.homes[homeId]
