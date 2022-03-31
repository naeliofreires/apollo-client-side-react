import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import PetBox from "../components/PetBox";
import NewPet from "../components/NewPet";
import Loader from "../components/Loader";
import Error from "../components/Error";

import { mutations, queries } from "../graphql";

export default function Pets() {
  const [modal, setModal] = useState(false);
  const allPets = useQuery(queries.ALL_PETS);
  const [createPet, response] = useMutation(mutations.CREATE_A_PET, {
    update(cache, { data: { addPet } }) {
      const data = cache.readQuery({ query: queries.ALL_PETS });

      cache.writeQuery({
        query: queries.ALL_PETS,
        data: { pets: [addPet, ...data.pets] },
      });
    },
  });

  if (allPets.loading || response.loading) {
    return <Loader />;
  }

  if (allPets.error || response.error) {
    return <Error />;
  }

  const pets = allPets.data.pets;
  const onSubmit = (input) => {
    createPet({
      variables: {
        input: {
          name: input.name,
          type: input.type,
        },
      },
    });

    setModal(false);
  };

  const petsList = pets.map((pet) => (
    <div className="col-xs-12 col-md-4 col" key={pet.id}>
      <div className="box">
        <PetBox pet={pet} />
      </div>
    </div>
  ));

  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <div className="row">{petsList}</div>
      </section>
    </div>
  );
}
