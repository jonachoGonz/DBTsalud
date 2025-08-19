import { useState } from 'react'
import { useSupabase } from '@/hooks/use-supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function SupabaseTest() {
  const { user, loading, supabase, signOut } = useSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.')
      }
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('¡Inicio de sesión exitoso!')
      }
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">Cargando...</div>
        </CardContent>
      </Card>
    )
  }

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>¡Conectado a Supabase!</CardTitle>
          <CardDescription>Usuario autenticado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
          <Button onClick={signOut} className="w-full">
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Prueba de Supabase</CardTitle>
        <CardDescription>
          Conecta con tu base de datos Supabase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleSignIn}
              disabled={isLoading}
              className="flex-1"
            >
              Iniciar Sesión
            </Button>
            <Button
              type="button"
              onClick={handleSignUp}
              variant="outline"
              disabled={isLoading}
              className="flex-1"
            >
              Registrarse
            </Button>
          </div>
        </form>
        {message && (
          <Alert className="mt-4">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
