import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

export default function FluidRateCalculator() {
  const [species, setSpecies] = useState<'canine' | 'feline'>('canine')
  const [calcMethod, setCalcMethod] = useState<'a' | 'b' | 'c'>('a')

  return (
    <Tabs defaultValue="maintenance">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="rehydration">Rehydration</TabsTrigger>
        <TabsTrigger value="resusitation">Resusitation</TabsTrigger>
      </TabsList>

      <TabsContent value="maintenance">
        <Card>
          <CardHeader>
            <CardTitle>유지</CardTitle>
            <CardDescription />
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="name">종 선택</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="종 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Canine</SelectItem>
                  <SelectItem value="cat">Feline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">계산법</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="계산법" />
                </SelectTrigger>
                <SelectContent defaultValue={calcMethod}>
                  {species === 'canine' ? (
                    <>
                      <SelectItem value="a">
                        a. 132 * (몸무게) <sup>0.75</sup>{' '}
                        <span className="text-sm text-muted-foreground">
                          ml/day
                        </span>
                      </SelectItem>
                      <SelectItem value="b">
                        b. 60{' '}
                        <span className="text-sm text-muted-foreground">
                          ml/kg/day
                        </span>
                      </SelectItem>
                      <SelectItem value="c">
                        c. 30 * (몸무게) + 70{' '}
                        <span className="text-sm text-muted-foreground">
                          ml/day
                        </span>
                      </SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="a">
                        a. 40{' '}
                        <span className="text-sm text-muted-foreground">
                          ml/kg/day
                        </span>
                      </SelectItem>
                      <SelectItem value="b">
                        b. 80 * (몸무게) <sup>0.75</sup>{' '}
                        <span className="text-sm text-muted-foreground">
                          ml/day
                        </span>
                      </SelectItem>
                      <SelectItem value="c">
                        c. 30 * (몸무게) + 70{' '}
                        <span className="text-sm text-muted-foreground">
                          ml/day
                        </span>
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">체중</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">배수</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="rehydration">
        <Card>
          <CardHeader>
            <CardTitle>탈수교정</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="resusitation">
        <Card>
          <CardHeader>
            <CardTitle>응급</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
