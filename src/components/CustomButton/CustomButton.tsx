import "./CustomButton.sass";
import styled from "styled-components";

// Определяем интерфейс для пропсов
interface CustomButtonProps {
  children: React.ReactNode; // Тип для содержимого кнопки
  bg: string; // Цвет фона
  onClick?: () => void; // Необязательный обработчик клика
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, bg, onClick }) => {
  return (
    <CustomButtonWrapper theme={bg} className="custom-button" onClick={onClick}>
      {children}
    </CustomButtonWrapper>
  );
};

// Styled-component для кнопки
const CustomButtonWrapper = styled.button`
  background-color: ${props => props.theme};
`;

export default CustomButton;