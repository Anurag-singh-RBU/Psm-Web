
import { useForm } from 'react-hook-form';

import { Button } from './components/ui/Button';
import { toast } from './lib/toast/Toast.service';
import { Form } from './components/ui/Form/Form';
import { FormInput } from './components/ui/Form/FormInput';

interface LoginFormValues {
  email: string;
  password: string;
}

const App = () => {
  const reactform = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    toast.info({ message: `Login form submitted for ${values.email}` });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-x-0">
        <Form {...reactform}>
          <form noValidate onSubmit={reactform.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              reactform={reactform}
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <FormInput
              reactform={reactform}
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <Button type="submit" className="w-full font-mono text-sm mt-3">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div >
  );
};

export default App;
