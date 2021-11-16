import './FamilyRow.css';

interface FamilyRowProps {
  family: string;
  text: string;
}

const FamilyRow: React.FC<FamilyRowProps> = ({ family, text }) => {
  return (
    <div>
      <p>{text} <strong>{family}</strong></p>
    </div>
  );
};

export default FamilyRow;
