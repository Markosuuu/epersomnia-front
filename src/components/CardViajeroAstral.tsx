type Prop = {
    nombreViajero: string;
}

export default function CardViajeroAstral({ nombreViajero }: Prop) {
  return (
    <>
      <div className="card-viajero-astral items-center">
        <img src="https://picsum.photos/200" alt={`image_${nombreViajero}`} />
        <p className="ms-4">{nombreViajero}</p>
      </div>
    </>
  );
}
