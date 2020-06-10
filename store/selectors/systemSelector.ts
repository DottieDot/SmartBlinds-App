import { RootState } from "..";

export default (systemId: number) => (state: RootState) => state.systems[systemId]
