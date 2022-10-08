import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import fsolve

# natural units
g = 1
m = 1

# position of the rope endpoints
x1,y1 = 0,0
x2,y2 = 7,5

# the length of the rope must be at minimum the distance between the endpoints
l = 1.3 * np.sqrt((x1-x2)**2 + (y1-y2)**2)

# boundary conditions
def bcs(args):
	A,B,C = args
	k = m*g*C/l
	return np.cosh(k*x1+A)/k+B-y1, np.cosh(k*x2+A)/k+B-y2, (np.sinh(k*x2+A)-np.sinh(k*x1+A))/k-l

A,B,C = fsolve(bcs,(1,1,1))

fig, ax = plt.subplots()

x = np.linspace(x1,x2,100)
k = m*g*C/l
ax.plot(x, np.cosh(k*x+A)/k+B, 'k')

ax.plot(x1,y1,'.r')
ax.plot(x2,y2,'.r')

ax.set_xlabel('x')
ax.set_ylabel('y')

plt.show()