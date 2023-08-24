import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Image from "@src/components/Image/Image";
import Text from "@src/components/Text/Text";
import { BaseComponent } from "@src/theme/BaseComponent";
import { ChangeEvent, useState } from "react";

type NewsletterTextFieldProps = {
  placeholder: string,
  value?: string,
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

function NewsletterTextField(props: NewsletterTextFieldProps) {
  return (
    <Box>
      <BaseComponent 
        as="input" 
        styleSheet={{
          border: '1px solid rgb(195, 195, 195)',
          padding: '8px',
          width: '100%',
          borderRadius: '4px',
          outline: 'none'
        }}
        {...props} 
        />
    </Box>
  )
}

const useForm = () => {
  const [values, setValues] = useState<object>({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    })
  }

  return {
    values,
    handleChange
  } as const

}

export default function NewsletterScreen() {

  const { values, handleChange } = useForm();

  return(
    <Box
      styleSheet={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={(evt) => {
        evt.preventDefault();
      }}>
      <Box
        styleSheet={{
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
          padding: '16px',
        }}
      >
        <Text styleSheet={{ marginBottom: '16px' }} variant="heading2">Newsletter Marota</Text>
        <Image 
        styleSheet={{
          borderRadius: '50%',
          width: '100px',
          marginBottom: '16px',
        }} 
        alt="Foto da newleter" 
        src="https://placehold.co/600x400" 
        />
          <NewsletterTextField 
            name="email"
            value={values['email'] ?? ''} 
            placeholder="Informe o seu e-mail" 
            onChange={handleChange}
             
          />
          <Button styleSheet={{ marginTop: '16px' }} onClick={() => {
            fetch('/api/newsletter/optin', {
              method: 'POST',
              body: JSON.stringify(values),
              headers: {
                "Content-type": "application/json",
              }
            }).then(async res => await res.json())
          }} fullWidth>Cadastrar</Button>
      </Box>
        </form>
    </Box>
  )
}
