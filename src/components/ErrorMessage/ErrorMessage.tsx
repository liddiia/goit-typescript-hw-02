import css from './ErrorMessage.module.css';

type ErrorMesageProps = {
  error: string | null;
};

const ErrorMesage = ({ error }: ErrorMesageProps) => {
  return (
    <div>
      <p className={css.errorMessage}>
        Oops, some error occurred. {error}... Please, try again later.
      </p>
    </div>
  );
};

export default ErrorMesage;
