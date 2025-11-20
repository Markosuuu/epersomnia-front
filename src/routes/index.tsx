import { Route } from "wouter";
import Home from "../pages/Home";
import ManifestarAvatar from "../pages/ManifestarAvatar";
import ExplorarSuenios from "../pages/ExplorarSuenios";

/**
 * Esto define las rutas (URL) del sitio
 */
export default function Routes() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/manifestar-avatar/:nombreViajero" component={ManifestarAvatar} />
      <Route path="/explorar-suenios" component={ExplorarSuenios} />
      {/* <Route path="/explorar-suenios/:id" component={ExplorarSuenios} /> */}
    </>
  );
}
