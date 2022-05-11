import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
type DropDownProps = {
  cities: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  citySelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  cities,
  citySelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClickHandler = (city: string): void => {
    citySelection(city);
    navigate("/profile");
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {cities.map(
          (city: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(city);
                }}
              >
                {city}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default DropDown;
