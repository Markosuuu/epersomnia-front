interface AtributoElementalProps {
  nombre: string;
  valor: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const handleIcon = (elem: string) => {
  switch (elem) {
    case "fuego":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="#9c2914"
            d="M6 14q0 1.3.525 2.463t1.5 2.037Q8 18.375 8 18.275v-.225q0-.8.3-1.5t.875-1.275L12 12.5l2.825 2.775q.575.575.875 1.275t.3 1.5v.225q0 .1-.025.225q.975-.875 1.5-2.037T18 14q0-1.25-.462-2.363T16.2 9.65q-.5.325-1.05.488t-1.125.162q-1.55 0-2.688-1.025T10.026 6.75Q9.05 7.575 8.3 8.463t-1.263 1.8t-.774 1.862T6 14m6 1.3l-1.425 1.4q-.275.275-.425.625t-.15.725q0 .8.587 1.375T12 20t1.412-.575T14 18.05q0-.4-.15-.737t-.425-.613zM12 3v3.3q0 .85.588 1.425t1.437.575q.45 0 .838-.187t.687-.563L16 7q1.85 1.05 2.925 2.925T20 14q0 3.35-2.325 5.675T12 22t-5.675-2.325T4 14q0-3.225 2.162-6.125T12 3"
          />
        </svg>
      );
    case "agua":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="#2d46af"
            d="M12 22q-3.425 0-5.712-2.35T4 13.8q0-1.55.7-3.1t1.75-2.975T8.725 5.05T11 2.875q.2-.2.463-.287T12 2.5t.538.088t.462.287q1.05.925 2.275 2.175t2.275 2.675T19.3 10.7t.7 3.1q0 3.5-2.287 5.85T12 22m0-2q2.6 0 4.3-1.763T18 13.8q0-1.825-1.513-4.125T12 4.65Q9.025 7.375 7.513 9.675T6 13.8q0 2.675 1.7 4.438T12 20"
          />
        </svg>
      );
    case "tierra":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="#a66913"
            d="M2 22h20l-6-8l-5-2l-3-4H2zm2-2v-1.6l2 .65l9.025-3L18 20zm2-3.05l-2-.675V14.4l2 .65l3.95-1.3l2.4 1.075zM18.5 14l4.5-2V8l-4.5-1L16 9v3zM6 12.95l-2-.675V10h3l1.625 2.075zm12.8-1.275l-.8-.625v-1.1l1-.8l2 .45v1.1zM12 8l5-2V1l-5-1l-3 2v4zm.225-2.25L11 4.925v-1.85l1.425-.95L15 2.65v2z"
          />
        </svg>
      );

    case "aire":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="#3cc66d"
            d="M11.5 20q-1.25 0-2.125-.875T8.5 17h2q0 .425.288.713T11.5 18t.713-.288T12.5 17t-.288-.712T11.5 16H2v-2h9.5q1.25 0 2.125.875T14.5 17t-.875 2.125T11.5 20M2 10V8h13.5q.65 0 1.075-.425T17 6.5t-.425-1.075T15.5 5t-1.075.425T14 6.5h-2q0-1.475 1.013-2.488T15.5 3t2.488 1.013T19 6.5t-1.012 2.488T15.5 10zm16.5 8v-2q.65 0 1.075-.425T20 14.5t-.425-1.075T18.5 13H2v-2h16.5q1.475 0 2.488 1.013T22 14.5t-1.012 2.488T18.5 18"
          />
        </svg>
      );
  }
};

const handleColor = (elem: string) => {
  switch (elem) {
    case "fuego":
      return "#ff6347";

    case "agua":
      return "#7aa2f7";

    case "tierra":
      return "#deb887";

    case "aire":
      return "#6ee7b7";

    default:
      "#fff";
  }
};

export default function AtributoElemental({
  nombre,
  valor,
  onIncrement,
  onDecrement,
}: AtributoElementalProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-md`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8">{handleIcon(nombre)}</div>
        <span className="text-white font-semibold text-lg">{nombre}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrement}
          disabled={valor <= 1}
          className={`text-xl font-bold w-8 h-8 rounded-full border border-white/30 flex items-center justify-center transition ${
            valor <= 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-white/10 hover:scale-110 cursor-pointer"
          }`}
        >
          –
        </button>
        <span
          className="w-6 text-center font-semibold"
          style={{ color: handleColor(nombre) }}
        >
          {valor}
        </span>
        <button
          onClick={onIncrement}
          disabled={valor >= 8}
          className={`text-xl font-bold w-8 h-8 rounded-full border border-white/30 flex items-center justify-center transition ${
            valor >= 8
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-white/10 hover:scale-110 cursor-pointer"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
}
