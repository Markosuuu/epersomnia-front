import { Route } from "wouter";
import Home from "../pages/Home";
import ManifestarAvatar from "../pages/ManifestarAvatar";

/**
 * Esto define las rutas (URL) del sitio
 */
export default function Routes() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/manifestar-avatar/:nombreViajero" component={ManifestarAvatar} />
    </>
  );
}
