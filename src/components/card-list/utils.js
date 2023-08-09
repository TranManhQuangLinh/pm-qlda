export const renderCardsInSingleRow = (options) => {
    return (
      <div className="row card-list">
        {options.map((item) => (
          <div key={item.key} className="col d-flex justify-content-center">
            {item.card}
          </div>
        ))}
      </div>
    );
  };