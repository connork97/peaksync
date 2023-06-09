"""added stripe payment id column to payments table

Revision ID: 76a723466d5d
Revises: 0cbb2788b43b
Create Date: 2023-05-30 13:02:54.445442

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76a723466d5d'
down_revision = '0cbb2788b43b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('payments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stripe_payment_id', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('payments', schema=None) as batch_op:
        batch_op.drop_column('stripe_payment_id')

    # ### end Alembic commands ###
