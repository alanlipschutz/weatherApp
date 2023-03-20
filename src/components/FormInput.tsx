import React from 'react';

interface PropsFormInput {
  theme: boolean;
  cityInput: string;
  handleChangeString: (event: React.ChangeEvent<HTMLInputElement>) => void;
  days: string;
  selectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const arrayOfDays = ['1', '3', '7', '14'];
export default function FormInput({
  theme,
  cityInput,
  handleChangeString,
  days,
  selectChange,
}: PropsFormInput) {
  return (
    <>
      <input
        type='text'
        placeholder='Search a city...'
        className={`input ${theme ? 'dark-input' : ''}`}
        value={cityInput}
        onChange={handleChangeString}
      />
      <select
        className={`${theme ? 'dark-input' : ''} select`}
        value={days}
        onChange={selectChange}
      >
        {arrayOfDays.map((day) => (
          <option className='dark-option' key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <button style={{ display: 'none' }} type='submit'></button>
    </>
  );
}
